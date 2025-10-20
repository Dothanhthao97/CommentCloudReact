// store.ts
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import formCommentReducer from "./system/systemSlice";
import rootSaga from "./rootSaga";
import loginSlice from "../services/login/loginSlice";
import commentSlice from "../components/CommentBox/commentSlice";
import systemReducer from "./system/systemSlice";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    system: systemReducer,
    formComment: formCommentReducer,
    login: loginSlice,
    comment: commentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
