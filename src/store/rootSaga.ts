// rootSaga.ts
import { all, fork } from "redux-saga/effects";
import formCommentSaga from "./system/systemSaga";
import { watchLoginSaga } from "../services/login/loginSaga";
import commentSaga from "../components/CommentBox/commentSaga";
import store from "./store";

export default function* rootSaga() {
  yield all([fork(formCommentSaga), fork(watchLoginSaga), fork(commentSaga)]);
}
export type RootState = ReturnType<typeof store.getState>;
