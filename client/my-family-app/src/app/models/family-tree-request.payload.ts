import { FamilyMember } from './family-member.model';  // Import the FamilyMember model

export class FamilyTreeRequestPayload {
  // Private fields for encapsulation
  #parents: FamilyMember[];
  #grandparents: FamilyMember[];
  #siblings: FamilyMember[];
  #spouse: FamilyMember;
  #children: FamilyMember[];
  #cousins: FamilyMember[];
  #uncles: FamilyMember[];
  #aunts: FamilyMember[];

  constructor(
    parents: FamilyMember[],
    grandparents: FamilyMember[],
    siblings: FamilyMember[],
    spouse: FamilyMember,
    children: FamilyMember[],
    cousins: FamilyMember[],
    uncles: FamilyMember[],
    aunts: FamilyMember[]
  ) {
    // Initialize private fields without using the spread operator
    this.#parents = parents;
    this.#grandparents = grandparents;
    this.#siblings = siblings;
    this.#spouse = spouse;
    this.#children = children;
    this.#cousins = cousins;
    this.#uncles = uncles;
    this.#aunts = aunts;
  }

  // Method-style getters for each property
  public getParents(): FamilyMember[] {
    return this.#parents;
  }

  public getGrandparents(): FamilyMember[] {
    return this.#grandparents;
  }

  public getSiblings(): FamilyMember[] {
    return this.#siblings;
  }

  public getSpouse(): FamilyMember {
    return this.#spouse;
  }

  public getChildren(): FamilyMember[] {
    return this.#children;
  }

  public getCousins(): FamilyMember[] {
    return this.#cousins;
  }

  public getUncles(): FamilyMember[] {
    return this.#uncles;
  }

  public getAunts(): FamilyMember[] {
    return this.#aunts;
  }

  // Property-style getters for each property
  public get parents(): FamilyMember[] {
    return this.#parents;
  }

  public get grandparents(): FamilyMember[] {
    return this.#grandparents;
  }

  public get siblings(): FamilyMember[] {
    return this.#siblings;
  }

  public get spouse(): FamilyMember {
    return this.#spouse;
  }

  public get children(): FamilyMember[] {
    return this.#children;
  }

  public get cousins(): FamilyMember[] {
    return this.#cousins;
  }

  public get uncles(): FamilyMember[] {
    return this.#uncles;
  }

  public get aunts(): FamilyMember[] {
    return this.#aunts;
  }
}
