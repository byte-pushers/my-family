import { BaseDomainModel } from './base-domain-model';
import { FamilyMember } from './family-member.model';

export class Person extends BaseDomainModel {
  #firstName: string;
  #lastName: string;
  #birthdate: Date;  // from age to birthdate
  #familyMembers: FamilyMember[];

  constructor(
      id: number,
      firstName: string,
      lastName: string,
      birthdate: Date,
      familyMembers: FamilyMember[] = [],
      createdBy?: string,
      createdDate?: Date,
      updatedBy?: string,
      updatedDate?: Date
  ) {
    super(id, createdBy, createdDate, updatedBy, updatedDate);
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#birthdate = birthdate;
    this.#familyMembers = familyMembers;
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
    return this.#birthdate;
  }

  public getBirthDate(): Date {
    return this.#birthdate;
  }

  // Property-style and Method-style combined for familyMembers
  public get familyMembers(): FamilyMember[] {
    return this.#familyMembers;
  }

  public getFamilyMembers(): FamilyMember[] {
    return this.#familyMembers;
  }

  // Override toString method
  public override toString(): string {
    return `{
      "firstName": "${this.#firstName}",
      "lastName": "${this.#lastName}",
      "birthdate": "${this.#birthdate.toISOString()}",
      "familyMembers": [${this.#familyMembers.map(fm => fm.toString()).join(', ')}]
    }`;
  }
}
