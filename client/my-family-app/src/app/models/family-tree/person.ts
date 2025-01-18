import { FamilyMember } from './family-member';
import { BaseDomain } from '../base-domain';

export interface Person extends BaseDomain {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  deceased: boolean;
  familyMembers: FamilyMember[];
  siblings: Person[];
  parents: Person[];

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
