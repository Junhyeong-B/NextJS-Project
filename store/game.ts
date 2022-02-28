import { createSlice } from "@reduxjs/toolkit";
import { GameProps } from "../components";

export type SearchOptionType = {
  platform: string;
  category: string[];
  sortBy: string;
};

export type StoreGameType = {
  searchGameLists: GameProps[];
  searchOptions: SearchOptionType;
};

const initialState: StoreGameType = {
  searchGameLists: [],
  searchOptions: {
    platform: "",
    category: [],
    sortBy: "",
  },
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setSearchGameLists(state, action: { payload: GameProps[] }) {
      state.searchGameLists = action.payload;
    },
    setSearchOptions(state, action: { payload: SearchOptionType }) {
      state.searchOptions = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice;
