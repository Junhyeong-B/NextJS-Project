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
  favoriteLists: number[];
};

const initialState: StoreGameType = {
  searchGameLists: [],
  searchOptions: {
    platform: "",
    category: [],
    sortBy: "",
  },
  favoriteLists: [],
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
    addFavoriteLists(state, action: { payload: number | number[] }) {
      const { payload } = action;
      if (Array.isArray(payload)) {
        state.favoriteLists = [...payload];
      } else {
        state.favoriteLists = [...state.favoriteLists, payload];
      }
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice;
