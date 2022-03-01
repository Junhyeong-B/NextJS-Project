import { createSlice } from "@reduxjs/toolkit";

export type AuthType = {
  token: string;
  isLoggedIn: boolean;
  userEmail: string;
};

export type LoginHandlerType = {
  payload: {
    idToken: string;
    email: string;
  };
};

export type StorageAuthType = {
  token: string;
  email: string;
};

export const AUTH_STORAGE_KEY = "Junhyeong-B";

const initialState = {
  token: "",
  isLoggedIn: false,
  userEmail: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    },
    login(state, action: LoginHandlerType) {
      state.token = action.payload.idToken;
      state.userEmail = action.payload.email;
      state.isLoggedIn = true;

      const value = {
        token: state.token,
        email: state.userEmail,
      };

      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value));
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
