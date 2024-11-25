import { BaseDomainModel } from '../base-domain.model';  // Import BaseDomainModel
import { Person } from './person';                      // Import Person
import { RelationshipType } from './relationship-type';
import { FamilyMember } from './family-member'; // Import RelationshipType

export class FamilyMemberModel extends BaseDomainModel implements FamilyMember {
  #relationship: RelationshipType;
  #person: Person;

  constructor(id: number, relationship: RelationshipType, person: Person, createdBy: string, createdDate: Date, updatedBy: string, updatedDate: Date) {
    super(id, createdBy, createdDate, updatedBy, updatedDate);  // Initialize BaseDomainModel fields
    this.#relationship = relationship;
    this.#person = person;
  }

  // Getters
  public get relationship(): RelationshipType {
    return this.#relationship;
  }

  public get person(): Person {
    return this.#person;
  }

  public getPartialJSON(): string {
    return `
      "relationship": "${this?.relationship}",
      "person": ${this?.person?.toString()}
    `;
  }
}
