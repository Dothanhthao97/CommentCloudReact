// src/features/login/loginSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginState {
  userInfo: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  userInfo: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = loginSlice.actions;

export default loginSlice.reducer;
