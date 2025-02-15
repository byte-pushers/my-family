import { BaseDomainModel } from '../base-domain.model';
import { Person } from './person';
import { FamilyMember } from './family-member';
import { FamilyMemberModel } from './family-member.model';
import {UnionModel} from "./union.model";

export class PersonModel extends BaseDomainModel implements Person {
  readonly #firstName: string;
  readonly #lastName: string;
  readonly #birthDate: Date;
  readonly #gender: string;
  readonly #deceased: boolean;
  readonly #siblings: Person[] | null;
  readonly #parents: Person[] | null;
  readonly #unions: UnionModel[] | null;

  constructor(...args: any[])
  constructor(props: any)
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    birthDate: Date,
    gender: string,
    deceased: boolean,
    siblings: Person[] | null,
    parents: Person[] | null,
    unions: UnionModel[] | null,
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
  )
  constructor() {
    const props: any = {};

    function getSuperParameters(args: IArguments, props: any): any {
      if (args.length === 1) {
        props.id = args[0].id;
        props.firstName = args[0].firstName;
        props.lastName = args[0].lastName;
        props.birthDate = args[0].birthDate;
        props.gender = args[0].gender;
        props.deceased = args[0].deceased;
        props.siblings = args[0].siblings;
        props.parents = args[0].parents;
        props.unions = args[0].unions;
        props.createdBy = args[0].createdBy;
        props.createdDate = args[0].createdDate;
        props.updatedBy = args[0].updatedBy;
        props.updatedDate = args[0].updatedDate;
      } else {
        const id = args[0];
        const firstName = args[1];
        const lastName = args[2];
        const birthDate = args[3];
        const gender = args[4];
        const deceased = args[5];
        const siblings = args[6];
        const parents = args[7];
        const unions = args[8];
        const createdBy = args[9];
        const createdDate = args[10];
        const updatedBy = args[11];
        const updatedDate = args[12];

        props.id = id;
        props.firstName = firstName;
        props.lastName = lastName;
        props.birthDate = birthDate;
        props.gender = gender;
        props.deceased = deceased;
        props.siblings = siblings;
        props.parents = parents;
        props.unions = unions;
        props.createdBy = createdBy;
        props.createdDate = createdDate;
        props.updatedBy = updatedBy;
        props.updatedDate = updatedDate;
      }

      return props;
    }

    super(getSuperParameters(arguments, props));

    this.#firstName = props?.firstName;
    this.#lastName = props?.lastName;
    this.#birthDate = props?.birthDate && new Date(props?.birthDate);
    this.#gender = props?.gender;
    this.#deceased = props?.deceased ?? false; // Default to `false` if not provided
    this.#siblings = props?.siblings;
    this.#parents = props?.parents;
    this.#unions = props?.unions ?? [];  // props?.unions?.map((union: any) => new UnionModel(union)) || []
  }

  // Property-style and Method-style combined for firstName
  public get firstName(): string {
    return this.#firstName;
  }

  public getFirstName(): string {
    return this.#firstName;
  }

  // Property-style and Method-style combined for lastName
  public get lastName(): string {
    return this.#lastName;
  }

  public getLastName(): string {
    return this.#lastName;
  }

  // Property-style and Method-style combined for birthDate
  public get birthDate(): Date {
    return this.#birthDate;
  }

  public getBirthDate(): Date {
    return this.#birthDate;
  }

  public get gender(): string {
    return this.#gender;
  }

  public getGender(): string {
    return this.#gender;
  }

  public get deceased(): boolean {
    return this.#deceased;
  }

  public getDeceased(): boolean {
    return this.#deceased;
  }

  public getSiblings(): Person[] | null {
    return this.#siblings;
  }

  public get siblings(): Person[] | null {
    return this.#siblings;
  }

  public getParents(): Person[] | null {
    return this.#parents;
  }

  public get parents(): Person[] | null {
    return this.#parents;
  }

  public get unions(): UnionModel[] | null {
    return this.#unions;
  }

  public getUnions(): UnionModel[] | null {
    return this.#unions;
  }

  // Method to calculate age based on birthdate
  public calculateAge(): number {
    const today = new Date();
    let age = today.getFullYear() - this.#birthDate.getFullYear();
    const monthDiff = today.getMonth() - this.#birthDate.getMonth();
    const dayDiff = today.getDate() - this.#birthDate.getDate();

    // Adjust if birthdate hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings()}`;
    const attributeStringsArray = [
      `${super.getAttributeIdString()}`,
      `${super.constructJsonStringProp(this.#firstName, 'firstName', false)}`,
      `${super.constructJsonStringProp(this.#lastName, 'lastName', false)}`,
      `${super.constructJsonDateProp(this.#birthDate, 'birthDate', false)}`,
      `${super.constructJsonBooleanProp(this.#deceased, 'deceased', false)}`,
      `${super.constructJsonStringProp(this.#gender, 'gender', false)}`,
      `${super.constructJsonArrayProp(this.#siblings, 'siblings', false)}`,
      `${super.constructJsonArrayProp(this.#parents, 'parents', false)}`,
      `${super.constructJsonArrayProp(this.#unions, 'unions', false)}`,
    ];
    const attributeStrings = super.concatenateAttributeStrings(attributeStringsArray);
    return `{
      ${attributeStrings}
      ${auditString.trim() === '' ? '' : `, ${auditString}`}
   }`/*.replace(/^\s*$(?:\r\n?|\n)/gm, '')*/;

    // option 1
    // const jsonObj = JSON.parse(json)
    // loop props looking for undefined to remove undefined attributes
    // return JSON.stringfy(jsonObj);
  }

  /*#convertArrayToJSON(array: any[]): string {
    let jsonArray = "[]";

    return jsonArray;
  }*/

  #createFamilyMembers(familyMembers?: FamilyMember[]) {
    const familyMembersArray = Array.isArray(familyMembers) && familyMembers.map(familyMember => new FamilyMemberModel(familyMember));

    return familyMembersArray ? familyMembersArray : [];
  }
}
