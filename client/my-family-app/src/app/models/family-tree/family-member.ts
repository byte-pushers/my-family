import { RelationshipType } from './relationship-type';
import { Person } from './person';

export interface FamilyMember {
  relationship: RelationshipType;
  person: Person;

  getId(): number | undefined;
}
