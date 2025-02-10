import { FamilyTree } from "./family-tree";

export interface FamilyTreeRequestPayload {
  userId: number;
  transactionId: string;
  familyTree: FamilyTree;
}
