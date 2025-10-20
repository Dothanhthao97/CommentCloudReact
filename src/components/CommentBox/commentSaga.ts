// src/features/comment/commentSaga.ts

import { call, put, takeLatest, all, fork, select } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { LoginAPI } from "../../services/api/LoginAPI";
import { getAPI } from "../../services/api/GetAPI"; // dùng chung cho mọi GET API

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

const getItemID = (state: RootState) => state.system.ItemID;

// -- LOGIN SAGA -- //
function* handleLogin(): SagaIterator {
  try {
    // const response = yield call(LoginAPI, "fnadmin", "DsignAdmin@2022!@#");
    // const response = {
    //   status: "SUCCESS",
    //   UserId: "fnadmin",
    //   mess: { Value: "Login thành công" },
    // };
    const response = yield call(LoginAPI, "fnadmin", "DsignAdmin@2022!@#");
    if (true || response?.status === "SUCCESS") {
      yield put(loginSuccess());
      //yield put(fetchCommentsRequest()); // login xong thì gọi luôn comment
    } else {
      yield put(loginFailure(response?.mess?.Value || "Login thất bại"));
    }
  } catch (error) {
    yield put(loginFailure("Login failed"));
  }
}

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

  //console.log(">>> API response:", res.data);
  const otherResourceId = res.data?.FormConfig?.OtherResourceId || null;
  //console.log(">>>otherResourceId:", otherResourceId);
  return otherResourceId;
}

// -- FETCH COMMENTS SAGA (gộp API vào đây) -- //
// Selector để lấy state từ redux

function* handleFetchComments(
  action: PayloadAction<{ ItemId: number }>
): SagaIterator {
  try {
    const itemId = action.payload.ItemId;

    // 1. Lấy OtherResourceId từ getFormData
    const otherResourceId = yield call(fetchOtherResourceIdFromFormData);
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
