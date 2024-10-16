// Here are my Enums for NameType and RelationshipType based on tonte's request
export enum NameType {
  FIRST_NAME = 'First Name',
  LAST_NAME = 'Last Name',
  FULL_NAME = 'Full Name'
}

export enum RelationshipType {
  FATHER = 'Father',
  MOTHER = 'Mother',
  SIBLING = 'Sibling',
  SPOUSE = 'Spouse',
  CHILD = 'Child',
  COUSIN = 'Cousin',
  UNCLE = 'Uncle',
  AUNT = 'Aunt',
  GRANDPARENT = 'Grandparent'
}

// Person class definition
export class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    public familyMembers: FamilyMember[] = [] // Add familyMembers array for nested structure
  ) {}
}

// FamilyMember class definition
export class FamilyMember {
  #name: NameType;
  #relationship: RelationshipType;
  #person: Person;

  constructor(name: NameType, relationship: RelationshipType, person: Person) {
    this.#name = name;
    this.#relationship = relationship;
    this.#person = person;
  }

  // Getter for name
  public get name(): NameType {
    return this.#name;
  }

  // Getter for relationship
  public get relationship(): RelationshipType {
    return this.#relationship;
  }

  // Getter for person
  public get person(): Person {
    return this.#person;
  }

  // Special getter method that returns a formatted description
  public get description(): string {
    return `${this.#person.firstName} is a ${this.#relationship}`;
  }
}
