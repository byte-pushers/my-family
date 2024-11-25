/**
 * @file person.ts
 * @description This file contains the Person class which represents an individual person and their family members.
 * @version 1.0.0
 * @author Danny Amezquita
 */

export interface Person extends BaseModel {
  firstName: string;
  lastName: string;
  birthDate: Date;
  familyMembers: FamilyMember[];

/**
 * Class representing a person.
 */
export class Person extends BaseDomainModel {
  #firstName: string;
  #lastName: string;
  #birthdate: Date;
  #familyMembers: FamilyMember[];

  /**
   * Constructor to initialize the fields.
   * @param {number} id - Unique identifier for the person.
   * @param {string} firstName - First name of the person.
   * @param {string} lastName - Last name of the person.
   * @param {Date} birthdate - Birthdate of the person.
   * @param {FamilyMember[]} familyMembers - Array of family members.
   * @param {string} [createdBy] - User who created the record.
   * @param {Date} [createdDate] - Date when the record was created.
   * @param {string} [updatedBy] - User who last updated the record.
   * @param {Date} [updatedDate] - Date when the record was last updated.
   */
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
    super(id, createdBy, createdDate, updatedBy, updatedDate);
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#birthdate = birthdate;
    this.#familyMembers = familyMembers;
  }

  // Property-style and Method-style combined for firstName

  /**
   * Get the first name.
   * @returns {string} First name of the person.
   */
  public get firstName(): string {
    return this.#firstName;
  }

  /**
   * Get the first name.
   * @returns {string} First name of the person.
   */
  public getFirstName(): string {
    return this.#firstName;
  }

  // Property-style and Method-style combined for lastName

  /**
   * Get the last name.
   * @returns {string} Last name of the person.
   */
  public get lastName(): string {
    return this.#lastName;
  }

  /**
   * Get the last name.
   * @returns {string} Last name of the person.
   */
  public getLastName(): string {
    return this.#lastName;
  }

  // Property-style and Method-style combined for birthDate

  /**
   * Get the birthdate.
   * @returns {Date} Birthdate of the person.
   */
  public get birthDate(): Date {
    return this.#birthdate;
  }

  /**
   * Get the birthdate.
   * @returns {Date} Birthdate of the person.
   */
  public getBirthDate(): Date {
    return this.#birthdate;
  }

  // Property-style and Method-style combined for familyMembers

  /**
   * Get the family members.
   * @returns {FamilyMember[]} Array of family members.
   */
  public get familyMembers(): FamilyMember[] {
    return this.#familyMembers;
  }

  /**
   * Get the family members.
   * @returns {FamilyMember[]} Array of family members.
   */
  public getFamilyMembers(): FamilyMember[] {
    return this.#familyMembers;
  }

  /**
   * Calculate the age based on birthdate.
   * @returns {number} Age of the person.
   */
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

  /**
   * Convert the person to a string.
   * @returns {string} String representation of the person.
   */
  public override toString(): string {
    return `{
      "firstName": "${this.#firstName}",
      "lastName": "${this.#lastName}",
      "birthdate": "${this.#birthdate.toISOString()}",
      "familyMembers": [${this.#familyMembers.map(fm => fm.toString()).join(', ')}]
    }`;
  }
}
