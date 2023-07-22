import { IProteinPublication } from "./IProteinPublication";

export interface IProtein {
  id: string;
  uniProtkbId: string;
  organism: string;
  description: string;
  gene: string;
  length: string;
  sequence: string;
  lastUpdated: string;
  molWeight: string;
  checksum: string;
  publications: IProteinPublication[];
}
