import { FamilyMemberModel } from './family-member.model';  // Import the FamilyMember model

export class FamilyTreeRequestPayload {
  // Private fields for encapsulation
  readonly #parents: FamilyMemberModel[];
  readonly #grandparents: FamilyMemberModel[];
  readonly #siblings: FamilyMemberModel[];
  readonly #spouse: FamilyMemberModel | null;  // Make spouse optional
  readonly #children: FamilyMemberModel[] | null;
  readonly #uncles: FamilyMemberModel[] | null;
  readonly #aunts: FamilyMemberModel[] | null;
  readonly #cousins: FamilyMemberModel[] | null;

  // Constructor to initialize the fields
  constructor(
    parents: FamilyMemberModel[],
    grandparents: FamilyMemberModel[],
    siblings: FamilyMemberModel[],
    spouse: FamilyMemberModel | null,  // Allow null for spouse
    children: FamilyMemberModel[] | null,
    uncles: FamilyMemberModel[] | null,
    aunts: FamilyMemberModel[] | null,
    cousins: FamilyMemberModel[] | null
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
  public get parents(): FamilyMemberModel[] {
    return this.#parents;
  }

  public get grandparents(): FamilyMemberModel[] {
    return this.#grandparents;
  }

  public get siblings(): FamilyMemberModel[] {
    return this.#siblings;
  }

  public get spouse(): FamilyMemberModel | null {
    return this.#spouse;
  }

  public get children(): FamilyMemberModel[] | null {
    return this.#children;
  }

  public get uncles(): FamilyMemberModel[] | null {
    return this.#uncles;
  }

  public get aunts(): FamilyMemberModel[] | null {
    return this.#aunts;
  }

  public get cousins(): FamilyMemberModel[] | null {
    return this.#cousins;
  }

  // Method-style getters
  public getParents(): FamilyMemberModel[] {
    return this.#parents;
  }

  public getGrandparents(): FamilyMemberModel[] {
    return this.#grandparents;
  }

  public getSiblings(): FamilyMemberModel[] {
    return this.#siblings;
  }

  public getSpouse(): FamilyMemberModel | null {
    return this.#spouse;
  }

  public getChildren(): FamilyMemberModel[] | null {
    return this.#children;
  }

  public getUncles(): FamilyMemberModel[] | null {
    return this.#uncles;
  }

  public getAunts(): FamilyMemberModel[] | null {
    return this.#aunts;
  }

  public getCousins(): FamilyMemberModel[] | null {
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
