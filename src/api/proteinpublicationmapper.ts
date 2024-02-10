import {
  IProteinPublication,
  IProteinPublicationReference,
} from "../types/IProteinPublication";

interface ICrossReference {
  database: string;
  id: string;
}

export function mapProteinPublicationsData(rawPub: any) {
  let pubMedId;

  try {
    if (rawPub.citation && rawPub.citation.citationCrossReferences) {
      pubMedId =
        rawPub.citation.citationCrossReferences.find(
          (ref: ICrossReference) => ref.database === "PubMed"
        )?.id ?? "";
    }
  } catch (error) {
    console.error(error);
  }

  let doiId;

  try {
    if (rawPub.citation && rawPub.citation.citationCrossReferences) {
      doiId =
        rawPub.citation.citationCrossReferences.find(
          (ref: ICrossReference) => ref.database === "DOI"
        )?.id ?? "";
    }
  } catch (error) {
    console.error(error);
  }

  let refs: IProteinPublicationReference[];

  refs = rawPub.references.map((rawRef: any) => {
    return {
      id: rawRef.citationId ?? "",
      source: rawRef.source?.name ?? "",
      categories: rawRef.sourceCategories ?? "",
      positions: rawRef.referencePositions ?? "",
    };
  });

  let item: IProteinPublication;
  item = {
    id: rawPub.citation?.id ?? "",
    authors: rawPub.citation?.authors ?? "",
    title: rawPub.citation?.title ?? "",
    journal: rawPub.citation?.journal ?? "",
    volume: rawPub.citation?.volume ?? "",
    firstPage: rawPub.citation?.firstPage ?? "",
    lastPage: rawPub.citation?.lastPage ?? "",
    publicationDate: rawPub.citation?.publicationDate ?? "",
    references: refs,
    pubMedId: pubMedId,
    doiId: doiId,
  };

  return item;
}
