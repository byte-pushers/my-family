import { BaseDomain } from '../base-domain';
import { Unions } from "./unions";

export interface Person extends BaseDomain {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  deceased: boolean;
  siblings: Person[] | null;
  parents: Person[] | null;
  unions: Unions | null;
}
