import { Permission } from './permission';  // Import Permission class

export class Role {
  #name: string;
  #permissions: Permission[];

  constructor(name: string, permissions: Permission[]) {
    this.#name = name;
    this.#permissions = permissions;
  }

  // Getters
  public getName(): string {
    return this.#name;
  }

  public get name(): string {
    return this.#name;
  }

  public getPermissions(): Permission[] {
    return this.#permissions;
  }

  public get permissions(): Permission[] {
    return this.#permissions;
  }

  // toString method for debugging
  public toString(): string {
    return `"role": {
              "name": "${this.#name}",
              "permissions": [${this.#permissions.map(permission => permission.toString()).join(', ')}]
            }`;
  }
}
