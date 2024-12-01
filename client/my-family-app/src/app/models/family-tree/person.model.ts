import { BaseDomainModel } from '../base-domain.model';
import { Person } from './person';
import { FamilyMember } from './family-member';
import { idCard } from 'ionicons/icons';

export class PersonModel extends BaseDomainModel implements Person {
  readonly #firstName: string;
  readonly #lastName: string;
  readonly #birthDate: Date;
  readonly #familyMembers: FamilyMember[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    birthDate: Date,
    familyMembers: FamilyMember[] = [],
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
  ) {
    super({id: id, createdBy: createdBy, createdDate: createdDate, updatedBy: updatedBy, updatedDate: updatedDate});
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#birthDate = birthDate;
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
    return this.#birthDate;
  }

  public getBirthDate(): Date {
    return this.#birthDate;
  }

  // Property-style and Method-style combined for familyMembers
  public get familyMembers(): FamilyMember[] {
    return this.#familyMembers;
  }

  public getFamilyMembers(): FamilyMember[] {
    return this.#familyMembers;
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

  public toString(): string {
    return`
      ${super.getAttributeIdString({id: this.id})}
      "firstName": "${this.#firstName}",
      "lastName": "${this.#lastName}",
      "birthDate": "${this.#birthDate.toISOString()}",
      "familyMembers": [${this.#familyMembers.map(fm => fm.toString()).join(', ')}]
      ${super.getAttributeAuditStrings({createdBy: this.createdBy})}
    `;
  }
}
