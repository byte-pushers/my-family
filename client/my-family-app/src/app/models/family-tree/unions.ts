import { Person } from './person';
import { BaseDomain } from '../base-domain';

export interface Unions extends BaseDomain {
  married: boolean;
  spouse: Person | null;
  children: Person[] | null;
}
