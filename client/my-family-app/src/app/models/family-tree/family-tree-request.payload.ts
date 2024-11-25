/**
 * @file family-tree-request.payload.ts
 * @description This file contains the FamilyTreeRequestPayload class which is used to encapsulate and manage family tree data.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { FamilyMember } from './family-member.model';  // Import the FamilyMember model

/**
 * Class representing the payload for a family tree request.
 */
export class FamilyTreeRequestPayload {
  #userId: number;
  #transactionId: string;
  #familyTree: FamilyTree;

  /**
   * Constructor to initialize the fields.
   * @param {FamilyMember[]} parents - Array of parent family members.
   * @param {FamilyMember[]} grandparents - Array of grandparent family members.
   * @param {FamilyMember[]} siblings - Array of sibling family members.
   * @param {FamilyMember | null} spouse - Spouse family member, can be null.
   * @param {FamilyMember[] | null} children - Array of children family members, can be null.
   * @param {FamilyMember[] | null} uncles - Array of uncle family members, can be null.
   * @param {FamilyMember[] | null} aunts - Array of aunt family members, can be null.
   * @param {FamilyMember[] | null} cousins - Array of cousin family members, can be null.
   */
  constructor(
    parents: FamilyMember[],
    grandparents: FamilyMember[],
    siblings: FamilyMember[],
    spouse: FamilyMember | null,  // Allow null for spouse
    children: FamilyMember[] | null,
    uncles: FamilyMember[] | null,
    aunts: FamilyMember[] | null,
    cousins: FamilyMember[] | null
  ) {
    this.#parents = parents;
    this.#grandparents = grandparents;
    this.#siblings = siblings;
    this.#spouse = spouse;
    this.#children = children;
    this.#uncles = uncles;
    this.#aunts = aunts;
    this.#cousins = cousins;
  }

  // Property-style getters

  /**
   * Get the parents.
   * @returns {FamilyMember[]} Array of parent family members.
   */
  public get parents(): FamilyMember[] {
    return this.#parents;
  }

  /**
   * Get the grandparents.
   * @returns {FamilyMember[]} Array of grandparent family members.
   */
  public get grandparents(): FamilyMember[] {
    return this.#grandparents;
  }

  /**
   * Get the siblings.
   * @returns {FamilyMember[]} Array of sibling family members.
   */
  public get siblings(): FamilyMember[] {
    return this.#siblings;
  }

  /**
   * Get the spouse.
   * @returns {FamilyMember | null} Spouse family member, can be null.
   */
  public get spouse(): FamilyMember | null {
    return this.#spouse;
  }

  /**
   * Get the children.
   * @returns {FamilyMember[] | null} Array of children family members, can be null.
   */
  public get children(): FamilyMember[] | null {
    return this.#children;
  }

  /**
   * Get the uncles.
   * @returns {FamilyMember[] | null} Array of uncle family members, can be null.
   */
  public get uncles(): FamilyMember[] | null {
    return this.#uncles;
  }

  /**
   * Get the aunts.
   * @returns {FamilyMember[] | null} Array of aunt family members, can be null.
   */
  public get aunts(): FamilyMember[] | null {
    return this.#aunts;
  }

  /**
   * Get the cousins.
   * @returns {FamilyMember[] | null} Array of cousin family members, can be null.
   */
  public get cousins(): FamilyMember[] | null {
    return this.#cousins;
  }

  // Method-style getters

  /**
   * Get the parents.
   * @returns {FamilyMember[]} Array of parent family members.
   */
  public getParents(): FamilyMember[] {
    return this.#parents;
  }

  /**
   * Get the grandparents.
   * @returns {FamilyMember[]} Array of grandparent family members.
   */
  public getGrandparents(): FamilyMember[] {
    return this.#grandparents;
  }

  /**
   * Get the siblings.
   * @returns {FamilyMember[]} Array of sibling family members.
   */
  public getSiblings(): FamilyMember[] {
    return this.#siblings;
  }

  /**
   * Get the spouse.
   * @returns {FamilyMember | null} Spouse family member, can be null.
   */
  public getSpouse(): FamilyMember | null {
    return this.#spouse;
  }

  /**
   * Get the children.
   * @returns {FamilyMember[] | null} Array of children family members, can be null.
   */
  public getChildren(): FamilyMember[] | null {
    return this.#children;
  }

  /**
   * Get the uncles.
   * @returns {FamilyMember[] | null} Array of uncle family members, can be null.
   */
  public getUncles(): FamilyMember[] | null {
    return this.#uncles;
  }

  /**
   * Get the aunts.
   * @returns {FamilyMember[] | null} Array of aunt family members, can be null.
   */
  public getAunts(): FamilyMember[] | null {
    return this.#aunts;
  }

  /**
   * Get the cousins.
   * @returns {FamilyMember[] | null} Array of cousin family members, can be null.
   */
  public getCousins(): FamilyMember[] | null {
    return this.#cousins;
  }

  /**
   * Convert the family tree request payload to a string.
   * @returns {string} String representation of the family tree request payload.
   */
  public toString(): string {
    return `{
      "userId": ${this.#userId},
      "transactionId:": ${this.#transactionId},
      "familyTree": ${this.familyTree}
    }`;
  }
}
