/**
 * Represents the response for a family tree.
 * Extends the BaseDomainModel.
 *
 * @author Danny
 * @version 1.0.0
 */
import { BaseDomainModel } from '../base-domain.model'; // Import BaseDomainModel
import { FamilyTreeResponse } from './family-tree-response'; // Import FamilyTreeResponse
import { FamilyTree } from './family-tree'; // Import FamilyTree
import { FamilyTreeModel } from './family-tree.model'; // Import FamilyTreeModel
import { RelationshipType } from './relationship-type'; // Import RelationshipType

// @ts-ignore
export class FamilyTreeResponseModel extends BaseDomainModel implements FamilyTreeResponse {
  readonly #relationship: RelationshipType;
  readonly #person: any; // Replace `any` with the correct type
  readonly #parent: number | null; // Changed type to match `number | null`
  readonly #familyMembers: FamilyTreeResponse[];
  readonly #data: FamilyTree;

  /**
   * Constructs a new FamilyTreeResponse instance.
   */
  constructor(...args: any[])
  constructor(props: any)
  constructor(
    id: number,
    relationship: RelationshipType,
    person: any,
    parent: number | null, // Changed type to match the interface
    familyMembers: FamilyTreeResponse[],
    data: FamilyTree,
    createdBy: string,
    updatedBy: string,
    createdDate: Date,
    updatedDate: Date
  )
  constructor() {
    const props: any = {};

    function getSuperParameters(args: IArguments, props: any): any {
      if (args.length === 1) {
        props.id = args[0].id ?? 0; // Ensure `id` defaults to 0 if undefined
        props.relationship = args[0].relationship;
        props.person = args[0].person;
        props.parent = args[0].parent; // Directly assign the parent's ID
        props.familyMembers = args[0].familyMembers;
        props.data = args[0].familyTree;
        props.createdBy = args[0].createdBy;
        props.updatedBy = args[0].updatedBy;
        props.createdDate = args[0].createdDate;
        props.updatedDate = args[0].updatedDate;
      } else {
        props.id = args[0] ?? 0; // Ensure `id` defaults to 0
        props.relationship = args[1];
        props.person = args[2];
        props.parent = args[3]; // Directly assign the parent's ID
        props.familyMembers = args[4];
        props.data = args[5];
        props.createdBy = args[6];
        props.updatedBy = args[7];
        props.createdDate = args[8];
        props.updatedDate = args[9];
      }

      return props;
    }

    super(getSuperParameters(arguments, props));
    this.#relationship = props.relationship;
    this.#person = props.person;
    this.#parent = props.parent; // Parent is now directly the parent's ID or null
    this.#familyMembers = props.familyMembers?.map(
      (member: any) => new FamilyTreeResponseModel(member)
    ) || [];
    this.#data = new FamilyTreeModel(props.data);
  }

  /**
   * Gets the relationship type.
   */
  public get relationship(): RelationshipType {
    return this.#relationship;
  }

  /**
   * Gets the person associated with the family tree response.
   */
  public get person(): any {
    return this.#person;
  }

  /**
   * Gets the parent family tree response.
   *
   * @returns {number | null} The parent's ID or null.
   */
  public get parent(): number | null {
    return this.#parent; // Return the parent's ID directly
  }

  /**
   * Gets the family members.
   *
   * @returns {FamilyTreeResponse[]} The family members in the tree.
   */
  public get familyMembers(): FamilyTreeResponse[] {
    return this.#familyMembers;
  }

  /**
   * Gets the family tree data.
   *
   * @returns {FamilyTree} The family tree data.
   */
  public get data(): FamilyTree {
    return this.#data;
  }

  /**
   * Returns a string representation of the family tree response.
   *
   * @override
   * @returns {string} A string representation of the family tree response.
   */
  public override toString(): string {
    return `{
      "relationship": "${this.#relationship}",
      "person": ${JSON.stringify(this.#person)},
      "parent": ${this.#parent},
      "familyMembers": [${this.#familyMembers.map(fm => fm.toString()).join(', ')}],
      "data": ${this.#data.toString()}
    }`;
  }
}
