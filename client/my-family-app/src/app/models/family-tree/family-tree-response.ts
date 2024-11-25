import { FamilyMember } from './family-member';
import { RelationshipType } from './relationship-type';

export interface FamilyTreeResponse {
  transactionId: number;
  userId: number;
  familyTreeId: number;
  relationship: RelationshipType;
  familyMembers: FamilyMember[];
  createdBy: string;
  createdDate: string;
  updatedBy?: string | null;
  updatedDate?: string | null;
}
