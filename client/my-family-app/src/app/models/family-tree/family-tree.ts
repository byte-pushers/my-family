import { BaseDomain } from '../base-domain';
import { FamilyMember } from './family-member';
import { Person } from './person';

export interface FamilyTree extends BaseDomain {
  familyMembers: FamilyMember[]; // todo: remove
  // people: Person[]; //todo: add;
}
