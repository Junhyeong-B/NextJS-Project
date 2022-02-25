import { createSlice } from "@reduxjs/toolkit";

export type AuthType = {
  token: string;
  isLoggedIn: boolean;
};

export type LoginHandler = {
  payload: {
    idToken: string;
  };
};

export const AUTH_STORAGE_KEY = "Junhyeong-B";

const initialState = {
  token: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem(AUTH_STORAGE_KEY);
    },
    login(state, action: LoginHandler) {
      state.token = action.payload.idToken;
      state.isLoggedIn = true;
      localStorage.setItem(AUTH_STORAGE_KEY, state.token);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
