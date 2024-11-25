import { BaseModel } from '../base.model';
import { RelationshipType } from './relationship-type';
import { Person } from './person';
import { FamilyMember } from './family-member';

export interface FamilyTree extends BaseModel {
  familyMembers: FamilyMember[];
}
