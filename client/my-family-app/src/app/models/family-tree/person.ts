import { BaseModel } from '../base.model';
import { FamilyMember } from './family-member';

export interface Person extends BaseDomain {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  deceased: boolean;
  familyMembers: FamilyMember[];

  /*constructor(
    id: number,
    firstName: string,
    lastName: string,
    birthDate: Date,
    familyMembers: FamilyMember[] = [],
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
  );*/
}
