import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import gameSlice from "./game";

const store = configureStore({
  reducer: { auth: authSlice.reducer, game: gameSlice.reducer },
});

export default store;
