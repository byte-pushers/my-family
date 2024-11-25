import { Role } from './role';  // Import Role class
import { FamilyMemberModel } from './family-tree/family-member.model';  // Import FamilyMember class

export class User {
  #username: string;
  #password: string;
  #roles: Role[];
  #familyMembers: FamilyMemberModel[];

  constructor(username: string, password: string, roles: Role[], familyMembers: FamilyMemberModel[]) {
    this.#username = username;
    this.#password = password;
    this.#roles = roles;
    this.#familyMembers = familyMembers;
  }

  // Getters
  public getUsername(): string {
    return this.#username;
  }

  public get username(): string {
    return this.#username;
  }

  public getPassword(): string {
    return this.#password;
  }

  public get password(): string {
    return this.#password;
  }

  public getRoles(): Role[] {
    return this.#roles;
  }

  public get roles(): Role[] {
    return this.#roles;
  }

  public getFamilyMembers(): FamilyMemberModel[] {
    return this.#familyMembers;
  }

  public get familyMembers(): FamilyMemberModel[] {
    return this.#familyMembers;
  }

  // toString method for debugging
  public toString(): string {
    return `"user": {
              "username": "${this.#username}",
              "roles": [${this.#roles.map(role => role.toString()).join(', ')}],
              "familyMembers": [${this.#familyMembers.map(member => member.toString()).join(', ')}]
            }`;
  }
}
