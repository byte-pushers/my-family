import { BaseDomain } from '../base-domain';
import {UnionModel} from "./union.model";

export interface Person extends BaseDomain {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  deceased: boolean;
  siblings: Person[] | null;
  parents: Person[] | null;
  unions: UnionModel[] | null;
}
