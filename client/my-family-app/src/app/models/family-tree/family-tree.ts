import { BaseDomain } from '../base-domain';
import { FamilyMember } from './family-member';

export interface FamilyTree extends BaseDomain {
  familyMembers: FamilyMember[];
}
