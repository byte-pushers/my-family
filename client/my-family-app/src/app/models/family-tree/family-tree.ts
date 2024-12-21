import { BaseDomain } from '../base-domain';
import { RelationshipType } from './relationship-type';
import { Person } from './person';
import { FamilyMember } from './family-member';

export interface FamilyTree extends BaseDomain {
  familyMembers: FamilyMember[];
}
