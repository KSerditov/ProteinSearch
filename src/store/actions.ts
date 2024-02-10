import { AppDispatch } from "./store";
import {
  fetchItems,
  fetchFacets,
  appendItems,
  fetchProtein,
  fetchProteinPublications,
  setSearchFilters,
} from "./itemslice";
import {
  fetchProteinItems,
  fetchAdditionalProteinItems,
  fetchProteinAPI,
  fetchProteinPublicationsAPI,
  fetchFacetsAPI,
} from "../api/apiservice";
import { IProteinPublicationsPayload } from "../types/IProteinPublication";
import { ISearchFilters } from "../types/ISearchFilters";

export const fetchItemsAsync =
  (searchString: string, searchFilters: ISearchFilters) =>
    async (dispatch: AppDispatch) => {
      try {
        const items = await fetchProteinItems(searchString, searchFilters);
        const facets = await fetchFacetsAPI(searchString);

        dispatch(setSearchFilters(searchFilters));
        dispatch(fetchItems(items));
        dispatch(fetchFacets(facets));
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error retrieving data: ${error.message}`);
        } else {
          console.error("Unexpected error occurred:", error);
        }
      }
    };

export const fetchAdditionalItemsAsync =
  (url: URL, searchString: string) => async (dispatch: AppDispatch) => {
    try {
      const items = await fetchAdditionalProteinItems(url, searchString);

      dispatch(appendItems(items));
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error retrieving data: ${error.message}`);
      } else {
        console.error("Unexpected error occurred:", error);
      }
    }
  };

export const fetchProteinAsync =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const protein = await fetchProteinAPI(id);

      dispatch(fetchProtein(protein));
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error retrieving protein data: ${error.message}`);
      } else {
        console.error(
          "Unexpected error occurred while obtaining protein data:",
          error
        );
      }
    }
  };

export const fetchProteinPublicationsAPIAsync =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const items = await fetchProteinPublicationsAPI(id);

      const payload: IProteinPublicationsPayload = {
        proteinId: id,
        publications: items,
      };

      dispatch(fetchProteinPublications(payload));
    }  catch (error) {
      if (error instanceof Error) {
        console.error(`Error retrieving data: ${error.message}`);
      } else {
        console.error("Unexpected error occurred:", error);
      }
    }
  };
