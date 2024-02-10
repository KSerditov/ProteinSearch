import { IProteinItem, IProteinGeneItem } from "../types/IProteinItem";

interface ISynonymValue {
  value: string;
}

interface IComment {
  commentType: string;
  subcellularLocations?: { location?: { value?: string } }[];
}

interface IGene {
  geneName?: { value?: string };
  synonyms?: ISynonymValue[];
}

interface IProteinInput {
  primaryAccession: string;
  uniProtkbId: string;
  organism: { scientificName: string };
  comments: IComment[];
  genes?: IGene[];
  sequence: { length: number };
}

export function mapProteinsData(rawProteinItem: IProteinInput) {
  let subcellularLocation: string = "";
  let foundComment: IComment | undefined;

  if (rawProteinItem.comments && Array.isArray(rawProteinItem.comments)) {
    foundComment = rawProteinItem.comments.find(
      (comment: IComment) => comment.commentType === "SUBCELLULAR LOCATION"
    );
  }

  if (
    foundComment &&
    foundComment.subcellularLocations &&
    Array.isArray(foundComment.subcellularLocations) &&
    foundComment.subcellularLocations?.length > 0
  ) {
    subcellularLocation =
      foundComment.subcellularLocations[0]?.location?.value ?? "";
  }

  let genesynonyms: ISynonymValue[] = [];
  let synonyms: string[] = [];
  let gene: IProteinGeneItem = {
    name: "",
    synonyms: [],
  };

  if (rawProteinItem.genes && Array.isArray(rawProteinItem.genes)) {
    genesynonyms = rawProteinItem.genes[0].synonyms || [];
    synonyms = genesynonyms ? genesynonyms.map((item) => item.value) : [];
    gene = {
      name: rawProteinItem?.genes[0]?.geneName?.value ?? "",
      synonyms: synonyms,
    };
  }

  const item: IProteinItem = {
    primaryAccession: rawProteinItem.primaryAccession,
    id: rawProteinItem.uniProtkbId,
    organism_name: rawProteinItem.organism.scientificName,
    gene_names: gene,
    cc_subcellular_location: subcellularLocation,
    length: rawProteinItem.sequence.length,
  };

  return item;
}
