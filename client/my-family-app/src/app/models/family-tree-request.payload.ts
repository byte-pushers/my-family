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

  // Constructor to initialize the fields
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
    this.#parents = parents;
    this.#grandparents = grandparents;
    this.#siblings = siblings;
    this.#spouse = spouse;
    this.#children = children;
    this.#cousins = cousins;
    this.#uncles = uncles;
    this.#aunts = aunts;
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

  // Method to generate the payload (organizes and gathers each family into the right format)
  public generatePayload() {
    return {
      parents: this.parents.map(fm => this.mapFamilyMember(fm)),
      grandparents: this.grandparents.map(fm => this.mapFamilyMember(fm)),
      siblings: this.siblings.map(fm => this.mapFamilyMember(fm)),
      spouse: this.spouse ? this.mapFamilyMember(this.spouse) : null, // Handle possible null spouse
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
  }
}
