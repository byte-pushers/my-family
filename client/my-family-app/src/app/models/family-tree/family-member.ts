import { RelationshipType } from './relationship-type';
import { Person } from './person';
import { BaseDomain } from "../base-domain";

export interface FamilyMember extends BaseDomain {
  relationship: RelationshipType;
  person: Person;

  getId(): number | undefined | null;
}
