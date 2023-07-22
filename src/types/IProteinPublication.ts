export interface IProteinPublication {
  id: string;
  authors: string[];
  title: string;
  journal: string;
  volume: string;
  firstPage: string;
  lastPage: string;
  publicationDate: string;
  references: IProteinPublicationReference[];
  pubMedId: string;
  doiId: string;
}

export interface IProteinPublicationReference {
    id: string;
    source: string;
    categories: string[];
    positions: string[];
}

export interface IProteinPublicationsPayload{
    proteinId: string;
    publications: IProteinPublication[];
}