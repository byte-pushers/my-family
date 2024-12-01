import { BaseDomainModel } from '../base-domain.model';  // Import BaseDomainModel
import { Person } from './person';                      // Import Person
import { RelationshipType } from './relationship-type';
import { FamilyMember } from './family-member'; // Import RelationshipType

export class FamilyMemberModel extends BaseDomainModel implements FamilyMember {
  readonly #relationship: RelationshipType;
  readonly #person: Person;

  constructor(id: number, relationship: RelationshipType, person: Person, createdBy: string, createdDate: Date, updatedBy: string, updatedDate: Date) {
    super({id: id, createdBy: createdBy, createdDate: createdDate, updatedBy: updatedBy, updatedDate: updatedDate});  // Initialize BaseDomainModel fields
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

  public toString(): string {
    return`
      ${super.getAttributeIdString({id: this.id})}
      "relationship": "${this?.relationship}",
      "person": ${this?.person?.toString()}
      ${super.getAttributeAuditStrings({createdBy: this.createdBy})}
    `;
  }
}
