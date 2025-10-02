// src/features/comment/commentSaga.ts

import { call, put, takeLatest, all, fork } from "redux-saga/effects";
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
} from "./commentSlice";

// -- LOGIN SAGA -- //
function* handleLogin(): SagaIterator {
  try {
    // const response = yield call(LoginAPI, "fnadmin", "DsignAdmin@2022!@#");
    const response = {
      status: "SUCCESS",
      UserId: "fnadmin",
      mess: { Value: "Login thành công" },
    }; // giả lập
    if (true || response?.status === "SUCCESS") {
      yield put(loginSuccess());
      yield put(fetchCommentsRequest()); // login xong thì gọi luôn comment
    } else {
      yield put(loginFailure(response?.mess?.Value || "Login thất bại"));
    }
  } catch (error) {
    yield put(loginFailure("Login failed"));
  }
}

// -- FETCH COMMENTS SAGA (gộp API vào đây) -- //
function* handleFetchComments(): SagaIterator {
  try {
    const response = yield call(getAPI,
      "https://dpmclouddev.vuthao.com/qc/_layouts/15/FN.DPM.API/Mobile/Social.ashx",
      {
        func: "getCommentByOtherResourceId",
        lid: 1066,
        rid: 10470,
        otherresourceid: "2342C063-8C15-4D6D-BA5D-D15B6F27A21D",
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
      yield put(fetchCommentsFailure(response?.mess?.Value || "Không có dữ liệu"));
    }
  } catch (error) {
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
