import { BaseDomainModel } from './base-domain-model';  // Import BaseDomainModel
import { Person } from './person';                      // Import Person
import { RelationshipType } from './relationship-type'; // Import RelationshipType

export class FamilyMember extends BaseDomainModel {
  #relationship: RelationshipType;
  #person: Person;

  constructor(
      id: number,
      relationship: RelationshipType,
      person: Person,
      createdBy: string,
      updatedBy: string,
      createdDate: Date,
      updatedDate: Date
  ) {
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

  //added overide since it overrides the method in BaseDomainModel
  public override toString(): string {  // Added 'override' here
    return `{
      "relationship": "${this.#relationship}",
      "person": ${this.#person.toString()}
    }`;
  }
}
