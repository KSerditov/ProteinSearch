import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProtein } from "../types/IProtein";
import { IProteinPublicationsPayload } from "../types/IProteinPublication";
import { ISearchResult } from "../types/ISearchResult";
import { ISearchFilters } from "../types/ISearchFilters";
import { IFacets } from "../types/IFacets";

interface IAppState {
  searchString: string;
  searchFilters: ISearchFilters;
  searchResults: ISearchResult;
  searchFacets: IFacets;
  proteinCache: { [id: string]: IProtein };
}

const initialState: IAppState = {
  searchString: "",
  searchFilters: {
    geneName: "",
    organism: [],
    sequenceLengthMin: "",
    sequenceLengthMax: "",
    annotationScore: "",
    proteinWith: [],
  },
  searchResults: {
    searchString: "",
    nextLink: "",
    totalResults: -1,
    items: [],
  },
  searchFacets: {
    organisms: [],
    proteinsWith: [],
  },
  proteinCache: {},
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    fetchItems: (state: IAppState, action: PayloadAction<ISearchResult>) => {
      state.searchResults = action.payload;
      return state;
    },
    fetchFacets: (state: IAppState, action: PayloadAction<IFacets>) => {
      state.searchFacets = action.payload;
      return state;
    },
    appendItems: (state: IAppState, action: PayloadAction<ISearchResult>) => {
      state.searchResults.nextLink = action.payload.nextLink;
      state.searchResults.items.push(...action.payload.items);
      return state;
    },
    setSearchFilters: (
      state: IAppState,
      action: PayloadAction<ISearchFilters>
    ) => {
      state.searchFilters = action.payload;
      return state;
    },
    fetchProtein: (state: IAppState, action: PayloadAction<IProtein>) => {
      state.proteinCache = {
        ...state.proteinCache,
        [action.payload.id]: action.payload,
      };
      return state;
    },
    fetchProteinPublications: (
      state: IAppState,
      action: PayloadAction<IProteinPublicationsPayload>
    ) => {
      if (action.payload.proteinId in state.proteinCache) {
        state.proteinCache[action.payload.proteinId].publications =
          action.payload.publications;
      } else {
        console.error(
          "proteinId does not exist in cache - this is not expected to happen: " +
            action.payload.proteinId
        );
      }

      return state;
    },
  },
});

export const {
  fetchItems,
  fetchFacets,
  appendItems,
  setSearchFilters,
  fetchProtein,
  fetchProteinPublications,
} = itemSlice.actions;
export default itemSlice.reducer;
