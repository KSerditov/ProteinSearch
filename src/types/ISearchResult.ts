import { IProteinItem } from "./IProteinItem";

export interface ISearchResult {
  searchString: string;
  totalResults: number;
  nextLink: string;
  items: IProteinItem[];
}
