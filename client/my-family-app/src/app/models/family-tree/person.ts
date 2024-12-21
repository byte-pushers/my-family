/**
 * @file person.ts
 * @description This file contains the Person class which represents an individual person and their family members.
 * @version 1.0.0
 * @author Danny Amezquita
 */
import { FamilyMember } from "./family-member";
import { BaseModel } from "../base.model";

export interface Person extends BaseModel {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  deceased: boolean;
  familyMembers: FamilyMember[];
}
