import { IProteinItem } from "../types/IProteinItem";
import { mapProteinsData } from "./mapper";
import { mapProteinData } from "./proteinmapper";
import { CONFIG } from "../config";
import { IProtein } from "../types/IProtein";
import { IProteinPublication } from "../types/IProteinPublication";
import { mapProteinPublicationsData } from "./proteinpublicationmapper";
import { ISearchResult } from "../types/ISearchResult";
import { ISearchFilters } from "../types/ISearchFilters";
import { IFacets, IFacetsItem } from "../types/IFacets";

export const fetchFacetsAPI = async (query: string): Promise<IFacets> => {
  const url = new URL(
    `${CONFIG.API_HOST}search?facets=model_organism,proteins_with,annotation_score&query=(${query})`
  );

  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(
        `Error retrieving data from fetchFacetsAPI: ${response.statusText}\nStatus: ${response.status}\nTarget URL: ${url}`
      );
    }

    const data = await response.json();
    let organisms: IFacetsItem[] = [];
    if (data.facets && Array.isArray(data.facets)) {
      organisms = data.facets.find(
        (facet: any) => facet?.name === "model_organism"
      )?.values;
    }

    let proteinsWith: IFacetsItem[] = [];
    if (data.facets && Array.isArray(data.facets)) {
      proteinsWith = data.facets.find(
        (facet: any) => facet?.name === "proteins_with"
      )?.values;
    }

    const item: IFacets = {
      organisms: organisms,
      proteinsWith: proteinsWith,
    };

    return item;
  } catch (error) {
    throw error;
  }
};

export const fetchProteinAPI = async (id: string): Promise<IProtein> => {
  const url = new URL(`${CONFIG.API_HOST}/${id}`);

  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(
        `Error retrieving data from fetchProteinAPI: ${response.statusText}\nStatus: ${response.status}\nTarget URL: ${url}`
      );
    }

    const data = await response.json();
    const item: IProtein = mapProteinData(data);

    return item;
  } catch (error) {
    throw error;
  }
};

export const fetchProteinPublicationsAPI = async (
  id: string
): Promise<IProteinPublication[]> => {
  const url = new URL(`${CONFIG.API_HOST}/${id}/publications`);

  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(
        `Error retrieving data from fetchProteinPublicationsAPI: ${response.statusText}\nStatus: ${response.status}\nTarget URL: ${url}`
      );
    }

    const data = await response.json();
    const items: IProteinPublication[] = data.results.map(
      mapProteinPublicationsData
    );

    return items;
  } catch (error) {
    throw error;
  }
};

const fetchProteinItemsCommonAPI = async (
  url: URL,
  searchString: string
): Promise<ISearchResult> => {
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(
        `Error retrieving data from fetchProteinItemsCommonAPI: ${response.statusText}\nStatus: ${response.status}\nTarget URL: ${url}`
      );
    }

    let link: string = response?.headers?.get("Link") ?? "";
    link = link.split("; ")[0].replace(/^<|>$/g, "");

    let totalResults: number = parseInt(
      response?.headers?.get("X-Total-Results") ?? ""
    );
    if (Number.isNaN(totalResults)) {
      totalResults = -1;
    }

    const data = await response.json();
    const items: IProteinItem[] = data.results.map(mapProteinsData);

    const result: ISearchResult = {
      searchString: searchString,
      totalResults: totalResults,
      nextLink: link,
      items: items,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchProteinItems = async (
  searchString: string,
  searchFilters: ISearchFilters
): Promise<ISearchResult> => {
  let stringFilters: string = "";

  if (searchFilters.geneName) {
    stringFilters += ` AND (gene:${searchFilters.geneName})`;
  }

  if (searchFilters.sequenceLengthMin && searchFilters.sequenceLengthMax) {
    stringFilters +=
      ` AND ` +
      encodeURIComponent(
        `length:[${searchFilters.sequenceLengthMin} TO ${searchFilters.sequenceLengthMax}]`
      ).replace(/%20/g, "+");
  }

  if (searchFilters.annotationScore) {
    stringFilters += ` AND annotation_score:${searchFilters.annotationScore}`;
  }

  if (
    searchFilters.organism &&
    Array.isArray(searchFilters.organism) &&
    searchFilters.organism.length > 0
  ) {
    const organismFilter = searchFilters.organism
      .map((org, idx) => {
        if (idx > 0) {
          return ` OR organism_id:${org}`;
        }

        return `organism_id:${org}`;
      })
      .join("");

    stringFilters += ` AND (${encodeURIComponent(organismFilter)})`;
  }

  if (
    searchFilters.proteinWith &&
    Array.isArray(searchFilters.proteinWith) &&
    searchFilters.proteinWith.length > 0
  ) {
    const proteinWithFilter = searchFilters.proteinWith
      .map((org, idx) => {
        if (idx > 0) return ` OR proteins_with:${org}`;

        return `proteins_with:${org}`;
      })
      .join("");
    stringFilters += ` AND (${encodeURIComponent(proteinWithFilter)})`;
  }

  const url = new URL(
    `${CONFIG.API_HOST}search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location&query=(${searchString}${stringFilters})&size=${CONFIG.API_ITEMS_PER_PAGE}`
  );

  return fetchProteinItemsCommonAPI(url, searchString);
};

export const fetchAdditionalProteinItems = async (
  url: URL,
  searchString: string
): Promise<ISearchResult> => {
  return fetchProteinItemsCommonAPI(url, searchString);
};
