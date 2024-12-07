import { FamilyTree } from './family-tree';

export interface FamilyTreeResponse {
  id?: number | null;
  familyTree: FamilyTree;
  createdBy?: string | null;
  createdDate?: Date | null;
  updatedBy?: string | null;
  updatedDate?: Date | null;
}
