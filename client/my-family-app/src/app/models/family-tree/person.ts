import { BaseModel } from '../base.model';
import { FamilyMember } from './family-member';

export interface Person extends BaseModel {
  firstName: string;
  lastName: string;
  birthDate: Date;
  familyMembers: FamilyMember[];
}
