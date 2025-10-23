// src/features/comment/commentSaga.ts

import { call, put, takeLatest, all, fork, select } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { LoginAPI } from "../../services/api/LoginAPI";
import { getAPI } from "../../services/api/GetAPI"; // dùng chung cho mọi GET API
import postAPI from "../../services/api/PostAPI"; // dùng cho mọi POST API

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  setOtherResourceId,
} from "./commentSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

// Declare global variable for SharePoint context info
declare const _spPageContextInfo: { serverRequestPath?: string };

const getItemID = (state: RootState) => state.system.ItemID;

// -- LOGIN SAGA -- //
function* handleLogin(): SagaIterator {
  try {
    const response = yield call(LoginAPI, "fnadmin", "DsignAdmin@2022!@#");
    if (true || response?.status === "SUCCESS") {
      yield put(loginSuccess());
    } else {
      yield put(loginFailure(response?.mess?.Value || "Login thất bại"));
    }
  } catch (error) {
    yield put(loginFailure("Login failed"));
  }
}

/** Hàm thực hiện API fallback để lấy ID nếu otherResourceId = null */
function* fetchFallbackOtherResourceId(
  itemId: number,
  LId?: string
): SagaIterator<string | null> {
  try {
    // const resourceUrl =
    //   (_spPageContextInfo?.serverRequestPath || "") + window.location.search;

    const bodyData = {
      IP: "",
      DeviceName: "PC",
      AppName: "Chrome",
      Platform: "Win32",
      CodeName: "Mozilla",
      UserAgent: window.navigator.userAgent,
      Title: "",
      ResourceCategoryId: 8,
      ResourceUrl: `/support/workflow/SitePages/Workflow.aspx?mode=2&LId=${LId}&ItemId=${itemId}`,
      Author: "",
      AuthorName: "",
      AuthorImagePath: "",
    };

    const response = yield call(
      postAPI,
      "/support/workflow/_layouts/15/VuThao.BPMOP.Social/OtherResouce.ashx?func=detail&uview=1&gcmm=1&glike=&clike=1&rcate=8&limit=10&gcmmchld=1&ver=" +
        Date.now(),
      bodyData
    );

    // giả sử API trả về một trường “ID” trong response.data.ID
    const fallbackId = response.data?.detail?.ID;
    //console.log("API response:", fallbackId);
    return fallbackId;
  } catch (err) {
    console.warn("fetchFallbackOtherResourceId failed:", err);
    return null;
  }
}

// -- FETCH COMMENTS SAGA (gộp API vào đây) -- //

function* fetchOtherResourceIdFromFormData(): SagaIterator {
  const itemId: number = yield select(getItemID);

  const res = yield call(
    getAPI,
    "/support/_layouts/15/FN.DPM.API/Mobile/WorkflowRequest.ashx",
    {
      func: "getFormData",
      lid: 1066,
      rid: itemId,
    }
  );

  //console.log("API response:", res.data);
  const otherResourceId = res.data?.FormConfig?.OtherResourceId || null;
  //console.log("otherResourceId:", otherResourceId);
  return otherResourceId;
}

// Selector để lấy state từ redux

function* handleFetchComments(
  action: PayloadAction<{
    ListID: any;
    ItemId: number;
  }>
): SagaIterator {
  try {
    const itemId = action.payload.ItemId;
    const LId = action.payload.ListID;
    // 1. Lấy OtherResourceId từ getFormData

    let otherResourceId = yield call(fetchOtherResourceIdFromFormData);
    //console.log(">>>otherResourceId:", otherResourceId);

    if (!otherResourceId) {
      // Nếu không có, gọi API fallback
      const fallbackId: string | null = yield call(
        fetchFallbackOtherResourceId,
        itemId,
        LId
      );
      otherResourceId = fallbackId;
      //console.log(">>>fallbackId:", fallbackId);
    }

    //console.log(">>>itemId và otherResourceId:", itemId, otherResourceId);

    yield put(setOtherResourceId(otherResourceId));

    // 2. Gọi API comment
    const response = yield call(
      getAPI,
      "/support/_layouts/15/FN.DPM.API/Mobile/Social.ashx",
      {
        func: "getCommentByOtherResourceId",
        lid: 1066,
        rid: itemId,
        otherresourceid: otherResourceId,
        resourcecategoryid: 8,
        resourcesubcategoryid: 9,
      }
    );

    if (response?.status === "SUCCESS") {
      const comments = Array.isArray(response.data)
        ? response.data.map((item: any) => ({
            ...item,
            IsLiked: item.IsLiked === 1,
          }))
        : [];

      yield put(fetchCommentsSuccess(comments));
    } else {
      yield put(
        fetchCommentsFailure(response?.mess?.Value || "Không có dữ liệu")
      );
    }
  } catch (error) {
    //console.error("Fetch comments error:", error);
    yield put(fetchCommentsFailure("Fetch comment failed"));
  }
}

// -- WATCHERS -- //
function* watchLogin() {
  yield takeLatest(loginRequest.type, handleLogin);
}

function* watchFetchComments() {
  yield takeLatest(fetchCommentsRequest.type, handleFetchComments);
}

// -- ROOT SAGA -- //
export default function* commentSaga() {
  yield all([fork(watchLogin), fork(watchFetchComments)]);
}
