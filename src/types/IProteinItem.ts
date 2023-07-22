export interface IProteinGeneItem {
    name: string;
    synonyms: string[];
}

export interface IProteinItem {
  primaryAccession: string;
  id: string;
  organism_name: string;
  gene_names: IProteinGeneItem;
  cc_subcellular_location: string;
  length: number;
}
