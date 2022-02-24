import { createSlice } from "@reduxjs/toolkit";

export type AuthType = {
  token: string;
};

const initialState = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: { payload: { idToken: string } }) {
      state.token = action.payload.idToken;
    },
    logout(state) {
      state.token = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
