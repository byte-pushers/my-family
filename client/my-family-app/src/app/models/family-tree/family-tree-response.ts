import { FamilyMember } from './family-member';
import { RelationshipType } from './relationship-type';

export interface FamilyTreeResponse {
  userId: number;
  transactionId: number;
  familyTreeId: number;
  relationship: RelationshipType;
  familyMembers: FamilyMember[];
  createdBy?: string | null;
  createdDate?: Date | null;
  updatedBy?: string | null;
  updatedDate?: Date | null;
}
