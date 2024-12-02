import { Person } from "src/app/models/family-tree/person";

// person-display.ts
export interface PersonDisplay {
  person: Person;
  nickname?: string;
  address: string;
}
