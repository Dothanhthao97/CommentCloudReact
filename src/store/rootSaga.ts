// rootSaga.ts
import { all, fork } from "redux-saga/effects";
import formCommentSaga from "./system/systemSaga";
import { watchLoginSaga } from "../services/login/loginSaga";
import commentSaga from "../components/CommentBox/commentSaga";

export default function* rootSaga() {
  yield all([fork(formCommentSaga), fork(watchLoginSaga),fork(commentSaga),]);
  
}


