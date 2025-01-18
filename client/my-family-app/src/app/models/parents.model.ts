import { Parents } from "./parents";
import { Person } from "./family-tree/person";

export class ParentsModel implements Parents {
  parents: Person[];

  constructor(parents: Person[]) {
    this.parents = parents;
  }

  public addParent(parent: Person): void {
    this.parents.push(parent);
  }

  public toString(): string {
    return `${this.parents}`
  }
}
