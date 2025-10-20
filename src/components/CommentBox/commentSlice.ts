// commentSlice.ts
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentModel } from "../utils/types";

interface CommentState {
  comments: CommentModel[];
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  otherResourceId: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  isLoggedIn: false,
  otherResourceId: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state) {
      state.isLoggedIn = true;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchCommentsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess(state, action: PayloadAction<CommentModel[]>) {
      state.comments = action.payload;
      state.loading = false;
    },
    fetchCommentsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    setOtherResourceId(state, action: PayloadAction<string | null>) {
      state.otherResourceId = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  setOtherResourceId,
} = commentSlice.actions;
// commentSlice.ts
export const fetchCommentsRequest = createAction<{ ItemId: number }>(
  "comment/fetchCommentsRequest"
);

export default commentSlice.reducer;
