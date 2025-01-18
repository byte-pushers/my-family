import { BaseDomainModel } from '../base-domain.model';
import { Person } from './person';
import { FamilyMember } from './family-member';
import { FamilyMemberModel } from './family-member.model';

export class PersonModel extends BaseDomainModel implements Person {
  readonly #firstName: string;
  readonly #lastName: string;
  readonly #birthDate: Date;
  readonly #gender: string;
  readonly #deceased: boolean;
  readonly #familyMembers: FamilyMember[];
  public parents: Person[];

  constructor(...args: any[])
  constructor(props: any)
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    birthDate: Date,
    gender: string,
    deceased: boolean,
    familyMembers: FamilyMember[],
    parents: Person[],
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
        props.familyMembers = args[0].familyMembers;
        props.parents = args[0].parents;
        props.createdBy = args[0].createdBy;
        props.createdDate = args[0].createdDate;
        props.updatedBy = args[0].updatedBy;
        props.updatedDate = args[0].updatedDate;
      } else {
        const id = args[0];
        const firstName = args[1];
        const lastName = args[2];
        const birthDate = args[4];
        const gender = args[5];
        const deceased = args[6];
        const familyMembers = args[7];
        const parents = args[8];
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
        props.familyMembers = familyMembers;
        props.parents = parents;
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
    this.#birthDate = new Date(props?.birthDate);
    this.#gender = props?.gender;
    this.#deceased = props?.deceased ?? false; // Default to `false` if not provided
    this.#familyMembers = this.#createFamilyMembers(props?.familyMembers);
    this.parents = props?.parents;
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

  /**
   * Gets the deceased status of the person.
   *
   * @returns {boolean} True if the person is deceased, false otherwise.
   */
  public get deceased(): boolean {
    return this.#deceased;
  }

  public isDeceased(): boolean {
    return this.#deceased;
  }

  // Property-style and Method-style combined for familyMembers
  public get familyMembers(): FamilyMember[] {
    return this.#familyMembers;
  }

  public getFamilyMembers(): FamilyMember[] {
    return this.#familyMembers;
  }

  public getParents(): Person[] {
    return this.parents;
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
    return `{
      ${super.getAttributeIdString()}
      "firstName": "${this.#firstName}",
      "lastName": "${this.#lastName}",
      "birthDate": "${this.#birthDate.toISOString()}",
      "deceased": ${this.#deceased},
      "familyMembers": [
        ${this.#familyMembers.join()}
      ],
      "parents": [
        ${this.parents}
      ]${auditString.trim() === '' ? `,\n\t  ${auditString}` : ''}
   }`;
  }

  #createFamilyMembers(familyMembers?: FamilyMember[]) {
    const familyMembersArray = Array.isArray(familyMembers) && familyMembers.map(familyMember => new FamilyMemberModel(familyMember));

    return familyMembersArray ? familyMembersArray : [];
  }
}
