import { Permission } from './permission';
import { Role } from './role';

export class RoleModel implements Role{
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
