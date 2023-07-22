import { IProtein } from "../types/IProtein";

export function mapProteinData(raw: any) {
  let item: IProtein = {
    id: raw?.primaryAccession ?? "",
    uniProtkbId: raw?.uniProtkbId ?? "",
    organism: raw?.organism?.scientificName ?? "",
    description:
      raw?.proteinDescription?.recommendedName?.fullName?.value ?? "",
    gene: raw?.genes[0]?.geneName.value ?? "",
    length: raw?.sequence?.length ?? "",
    sequence: raw?.sequence?.value ?? "",
    lastUpdated: raw?.entryAudit?.lastSequenceUpdateDate ?? "",
    molWeight: raw?.sequence?.molWeight ?? "",
    checksum: raw?.sequence?.crc64 ?? "",
    publications: [], // this will be populated later once user access Publications page
  };

  return item;
}
