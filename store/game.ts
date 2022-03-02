import { createSlice } from "@reduxjs/toolkit";
import { GameProps } from "../components";

export type SearchOptionType = {
  platform: string;
  category: string[];
  sortBy: string;
};

export type StoredKeyAndIdType = {
  key: string;
  id: number;
};

export type StoreGameType = {
  searchGameLists: GameProps[];
  searchOptions: SearchOptionType;
  favoriteLists: number[];
  storedKeyAndId: StoredKeyAndIdType[];
  currentPage: number;
};

const initialState: StoreGameType = {
  searchGameLists: [],
  searchOptions: {
    platform: "",
    category: [],
    sortBy: "",
  },
  favoriteLists: [],
  storedKeyAndId: [],
  currentPage: -1,
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
    deleteGameFromFavoriteLists(state, action: { payload: number }) {
      state.favoriteLists = state.favoriteLists.filter(
        (id) => id !== action.payload
      );
      state.storedKeyAndId = state.storedKeyAndId.filter(
        ({ id }) => id !== action.payload
      );
    },
    addStoredKey(
      state,
      action: { payload: StoredKeyAndIdType | StoredKeyAndIdType[] }
    ) {
      if (Array.isArray(action.payload)) {
        state.storedKeyAndId = action.payload;
      } else {
        const newState = state.storedKeyAndId.concat(action.payload);
        state.storedKeyAndId = newState;
      }
    },
    movePage(state, action: { payload: number }) {
      state.currentPage = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice;
