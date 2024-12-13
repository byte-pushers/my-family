/**
 * Represents a family member in the family tree.
 * Extends the BaseDomainModel.
 *
 * @author Danny Amezquita
 * @version 1.0.0
 */
import { BaseDomainModel } from '../base-domain-model';  // Import BaseDomainModel
import { Person } from './person';                      // Import Person
import { RelationshipType } from './relationship-type'; // Import RelationshipType

export class FamilyMember extends BaseDomainModel {
  #relationship: RelationshipType;
  #person: Person;

  /**
   * Constructs a new FamilyMember instance.
   *
   * @param {number} id - The unique identifier for the family member.
   * @param {RelationshipType} relationship - The relationship type of the family member.
   * @param {Person} person - The person associated with the family member.
   * @param {string} createdBy - The user who created the record.
   * @param {string} updatedBy - The user who last updated the record.
   * @param {Date} createdDate - The date the record was created.
   * @param {Date} updatedDate - The date the record was last updated.
   */
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

  /**
   * Gets the relationship type of the family member.
   *
   * @returns {RelationshipType} The relationship type.
   */
  public get relationship(): RelationshipType {
    return this.#relationship;
  }

  /**
   * Gets the person associated with the family member.
   *
   * @returns {Person} The person.
   */
  public get person(): Person {
    return this.#person;
  }

  /**
   * Returns a string representation of the family member.
   *
   * @override
   * @returns {string} A string representation of the family member.
   */
  public override toString(): string {  // Added 'override' here
    return `{
      "relationship": "${this.#relationship}",
      "person": ${this.#person.toString()}
    }`;
  }
}
