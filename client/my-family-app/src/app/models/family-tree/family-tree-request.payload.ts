import { FamilyTree } from "./family-tree";
import { BaseDomain } from "../base-domain";

export interface FamilyTreeRequestPayload extends BaseDomain {
  userId: number;
  transactionId: string;
  familyTree: FamilyTree;
}
