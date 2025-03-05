import { Role } from './role';
import { FamilyMember } from './family-tree/family-member';
import { User } from './user';

export class UserModel implements User {
  #username: string;
  #password: string;
  #roles: Role[];
  #familyMembers: FamilyMember[];

  constructor(username: string, password: string, roles: Role[], familyMembers: FamilyMember[]) {
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

  public getFamilyMembers(): FamilyMember[] {
    return this.#familyMembers;
  }

  public get familyMembers(): FamilyMember[] {
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
