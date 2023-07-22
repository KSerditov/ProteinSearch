export interface IFacetsItem {
  label: string;
  value: string;
  count: string;
}

export interface IFacets {
  organisms: IFacetsItem[];
  proteinsWith: IFacetsItem[];
}
