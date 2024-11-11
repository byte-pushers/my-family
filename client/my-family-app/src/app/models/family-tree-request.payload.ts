import { FamilyMember } from './family-member.model';  // Import the FamilyMember model

export class FamilyTreeRequestPayload {
  // Private fields for encapsulation
  readonly #parents: FamilyMember[];
  readonly #grandparents: FamilyMember[];
  readonly #siblings: FamilyMember[];
  readonly #spouse: FamilyMember | null;  // Make spouse optional
  readonly #children: FamilyMember[] | null;
  readonly #uncles: FamilyMember[] | null;
  readonly #aunts: FamilyMember[] | null;
  readonly #cousins: FamilyMember[] | null;

  // Constructor to initialize the fields
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
  public get parents(): FamilyMember[] {
    return this.#parents;
  }

  public get grandparents(): FamilyMember[] {
    return this.#grandparents;
  }

  public get siblings(): FamilyMember[] {
    return this.#siblings;
  }

  public get spouse(): FamilyMember | null {
    return this.#spouse;
  }

  public get children(): FamilyMember[] | null {
    return this.#children;
  }

  public get uncles(): FamilyMember[] | null {
    return this.#uncles;
  }

  public get aunts(): FamilyMember[] | null {
    return this.#aunts;
  }

  public get cousins(): FamilyMember[] | null {
    return this.#cousins;
  }

  // Method-style getters
  public getParents(): FamilyMember[] {
    return this.#parents;
  }

  public getGrandparents(): FamilyMember[] {
    return this.#grandparents;
  }

  public getSiblings(): FamilyMember[] {
    return this.#siblings;
  }

  public getSpouse(): FamilyMember | null {
    return this.#spouse;
  }

  public getChildren(): FamilyMember[] | null {
    return this.#children;
  }

  public getUncles(): FamilyMember[] | null {
    return this.#uncles;
  }

  public getAunts(): FamilyMember[] | null {
    return this.#aunts;
  }

  public getCousins(): FamilyMember[] | null {
    return this.#cousins;
  }

  /*
  // Method to generate the payload (organizes and gathers each family into the right format)
  public generatePayload() {
    return {
      parents: this.parents.map(fm => this.mapFamilyMember(fm)),
      grandparents: this.grandparents.map(fm => this.mapFamilyMember(fm)),
      siblings: this.siblings.map(fm => this.mapFamilyMember(fm)),
      spouse: this.spouse ? this.mapFamilyMember(this.spouse) : null,  // Handle possible null spouse
      children: this.children.map(fm => this.mapFamilyMember(fm)),
      cousins: this.cousins.map(fm => this.mapFamilyMember(fm)),
      uncles: this.uncles.map(fm => this.mapFamilyMember(fm)),
      aunts: this.aunts.map(fm => this.mapFamilyMember(fm)),
    };
  }

  // Helper method to format each family member object into the appropriate structure
  private mapFamilyMember(familyMember: FamilyMember) {
    return {
      relationship: familyMember.relationship,
      person: {
        firstName: familyMember.person.firstName,
        lastName: familyMember.person.lastName,
        birthDate: familyMember.person.birthDate,  // Now references the getter for birthDate
        familyMembers: familyMember.person.familyMembers.map(fm => ({
          relationship: fm.relationship, // For each nested family member (fm), it recursively processes them in the same way
          person: {} // Empty object for nested family members, as specified
        }))
      }
    }
  }*/

  public toString(): string {
    return this.parents.toString() +
      this.grandparents.toString() +
      this.siblings.toString() +
      this.spouse?.toString() +
      this.children?.toString() +
      this.uncles?.toString() +
      this.aunts?.toString() +
      this.cousins?.toString();
  }
}
