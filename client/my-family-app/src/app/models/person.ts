// src/app/models/person.ts

import { BaseDomainModel } from './base-domain-model';
import { FamilyMember } from './family-member.model';

export class Person extends BaseDomainModel {
  #firstName: string;
  #lastName: string;
  #birthdate: Date;
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

  // Method to calculate age based on birthdate
  public calculateAge(): number {
    const today = new Date();
    let age = today.getFullYear() - this.#birthdate.getFullYear();
    const monthDiff = today.getMonth() - this.#birthdate.getMonth();
    const dayDiff = today.getDate() - this.#birthdate.getDate();

    // Adjust if birthdate hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
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
