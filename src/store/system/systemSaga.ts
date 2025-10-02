// src/features/formComment/formCommentSaga.ts

import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { getAPI } from "../../services/api/GetAPI";
import {
  fetchFormStructureRequest,
  fetchFormStructureSuccess,
  fetchFormStructureFailure,
  fetchFormDataRequest,
  fetchFormDataSuccess,
  fetchFormDataFailure,
} from "./systemSlice";

// -- FETCH STRUCTURE -- //
function* fetchFormStructureSaga(): SagaIterator {
  try {
    const res = yield call(getAPI,
      "/api-social/qc/_layouts/15/FN.DPM.API/Mobile/WorkflowRequest.ashx",
      {
        func: "getFormTemplate",
        lid: 1066,
        listid: "2342c063-8c15-4d6d-ba5d-d15b6f27a21d",
      }
    );

    const FormDefineInfo = res.data?.InfoCollection?.FormDefineInfo;
    const FormFieldInfo = res.data?.FormFieldInfo;

    // Step 1: Map field name => field detail
    const fieldInfoMap = new Map<string, any>();
    FormFieldInfo.forEach((field: any, index: number) => {
        const title = field?.Title || "(no title)";
        const name = field?.Name || "(no name)";
        const rawOption = field?.Option;

        if (!rawOption) {
            //console.warn(`[#${index}] Field: ${title} (${name}) không có Option`);
            return;
        }

        try {
            const parsedOption = JSON.parse(rawOption);
            fieldInfoMap.set(name, {
                ...field,
                parsedOption,
            });
            //console.log(`[#${index}] Field: ${title} (${name}) => Require: ${parsedOption.Require}`);
        } catch (err) {
            console.error(`[#${index}] Lỗi parse Option cho field: ${title} (${name})`, err);
        }
    });


    let titleForm = "";
    let fieldsGroup: any[][] = [];

    if (typeof FormDefineInfo === "string") {
      try {
        const parsed = JSON.parse(FormDefineInfo);
        titleForm = parsed?.[0]?.titleForm || "";
        const rowDefineInfoCollection = parsed?.[0]?.rowDefineInfoCollection || [];

        const excludedFields = ["_17", "_18", "_19", "YKien"];

        // Step 2: Filter groups (loại bỏ group chứa các field không cần thiết)
        const filteredGroups = rowDefineInfoCollection.filter((group: any[]) =>
          !group.some((field) =>
            excludedFields.some((prefix) => field.internalName?.startsWith(prefix))
          )
        );

        // Step 3: Gộp thêm thông tin chi tiết vào từng field
        fieldsGroup = filteredGroups.map((group: any[]) =>
            group.map((field: any) => {
                const matchKey = field.internalName || field.Name;
                const matchingField = fieldInfoMap.get(matchKey);
                
                return {
                ...field,
                ...(matchingField || {}), // an toàn hơn khi matchingField = undefined
                };
            })
          );
          //console.log("Field after merge:", fieldsGroup?.[0]?.[0]);          
      } catch (error) {
        yield put(fetchFormStructureFailure("Lỗi parse dữ liệu cấu trúc form"));
        return;
      }
    }

    yield put(fetchFormStructureSuccess({ titleForm, fieldsGroup }));
  } catch (error: any) {
    yield put(fetchFormStructureFailure(error.message || "Lỗi tải cấu trúc form"));
  }
}

// -- FETCH DATA -- //
function* fetchFormDataSaga(): SagaIterator {
  try {
    const res = yield call(getAPI,
      "/api-social/qc/_layouts/15/FN.DPM.API/Mobile/WorkflowRequest.ashx",
      {
        func: "getFormData",
        lid: 1066,
        rid: 124818, // 👈 bạn có thể truyền từ action nếu muốn động
      }
    );

    yield put(fetchFormDataSuccess(res.data));
  } catch (error: any) {
    yield put(fetchFormDataFailure(error.message || "Lỗi tải dữ liệu form"));
  }
}

// -- WATCHERS -- //
function* watchFetchFormStructure() {
  yield takeLatest(fetchFormStructureRequest.type, fetchFormStructureSaga);
}

function* watchFetchFormData() {
  yield takeLatest(fetchFormDataRequest.type, fetchFormDataSaga);
}

// -- ROOT SAGA -- //
export default function* formCommentSaga() {
  yield all([fork(watchFetchFormStructure), fork(watchFetchFormData)]);
}
