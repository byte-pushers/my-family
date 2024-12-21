/**
 * @file person.ts
 * @description This file contains the Person class which represents an individual person and their family members.
 * @version 1.0.0
 * @author Danny Amezquita
 */
import { FamilyMember } from "./family-member";
import { BaseDomain } from "../base-domain";

export interface Person extends BaseDomain {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  deceased: boolean;
  familyMembers: FamilyMember[];
}
