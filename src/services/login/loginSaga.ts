// src/features/login/loginSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./loginSlice";
import { LoginAPI } from "../../services/api/LoginAPI";

function* loginWorkerSaga(action: ReturnType<typeof loginRequest>): any {
  try {
    const { username, password } = action.payload;
    const userInfo = yield call(LoginAPI, username, password);
    yield put(loginSuccess(userInfo));
  } catch (err: any) {
    yield put(loginFailure(err.message || "Login thất bại"));
  }
}

export function* watchLoginSaga() {
  yield takeLatest(loginRequest.type, loginWorkerSaga);
}
