/**
 * Represents a family member in the family tree.
 * Extends the BaseDomainModel.
 *
 * @author Danny Amezquita
 * @version 1.0.0
 */
import { BaseDomainModel } from '../base-domain.model'; // Import BaseDomainModel
import { Person } from './person'; // Import Person
import { RelationshipType } from './relationship-type';
import { FamilyMember } from './family-member';
import { PersonModel } from './person.model';

export class FamilyMemberModel extends BaseDomainModel implements FamilyMember {
  readonly #relationship: RelationshipType;
  readonly #person: Person;

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
  constructor(...args: any[])
  constructor(props: any)
  constructor(
      id: number,
      relationship: RelationshipType,
      person: Person,
      createdBy: string,
      updatedBy: string,
      createdDate: Date,
      updatedDate: Date
  )
  constructor() {
    const props: any = {};

    function getSuperParameters(args: IArguments, props: any): any {
      if (args.length === 1) {
        props.id = args[0].id;
        props.relationship = args[0].relationship;
        props.person = args[0].person;
        props.createdBy = args[0].createdBy;
        props.updatedBy = args[0].updatedBy;
        props.createdDate = args[0].createdDate;
        props.updatedDate = args[0].updatedDate;
      } else {
        const id = args[0];
        const relationship = args[1];
        const person = args[2];
        const createdBy = args[4];
        const createdDate = args[5];
        const updatedBy = args[6];
        const updatedDate = args[7];

        props.id = id;
        props.relationship = relationship;
        props.person = person;
        props.createdBy = createdBy;
        props.updatedBy = updatedBy;
        props.createdDate = createdDate;
        props.updatedDate = updatedDate;
      }

      return props;
    }
    super(getSuperParameters(arguments, props));
    const r = this.createRelationShip(props?.relationship);
    // @ts-ignore
    this.#relationship = RelationshipType[r];
    // @ts-ignore
    this.#person = new PersonModel(props?.person);
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

  private createRelationShip(relationship: any): string | undefined {
    const keys = Object.keys(RelationshipType);

    return keys.find((key, index) => {
      if (key === relationship) {
        // @ts-ignore
        return RelationshipType[key];
      }

      return undefined;
    });
  }
}
