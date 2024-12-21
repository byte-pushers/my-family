/**
 * @file family-tree-response.ts
 * @description This file contains the FamilyTreeResponse interface and helper functions to manage family tree response data.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { BaseDomainModel } from '../base-domain.model';
import { Person } from './person';
import { FamilyMember } from './family-member.model';
import { RelationshipType } from './relationship-type';

/**
 * Interface representing raw person data from API before instantiation.
 */
export interface PersonResponseData {
  id: number;
  createdBy: string;
  updatedBy: string | null;
  createdDate: string;
  updatedDate: string | null;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
}

/**
 * Helper function to convert API data to Person instance.
 * @param {PersonResponseData} data - Raw person data from API.
 * @returns {Person} Instance of Person.
 */
export function createPersonFromResponse(data: PersonResponseData): Person {
  return new Person(
    data.id,
    data.firstName,
    data.lastName,
    new Date(data.birthDate),
    [], // Initialize empty family members array
    data.createdBy,
    new Date(data.createdDate),
    data.updatedBy || undefined,
    data.updatedDate ? new Date(data.updatedDate) : undefined
  );
}

/**
 * Interface representing the main response for a family tree.
 */
export interface FamilyTreeResponse {
  id: number;
  createdBy: string;
  updatedBy: string | null;
  createdDate: string;
  updatedDate: string | null;
  relationship: string;
  person: PersonResponseData;  // Raw data that will be converted to Person
  parent: number | null;
  familyMembers: FamilyTreeResponse[];
}

/**
 * Helper function to convert API response to FamilyMember instance.
 * @param {FamilyTreeResponse} data - Raw family tree response data from API.
 * @returns {FamilyMember} Instance of FamilyMember.
 */
export function createFamilyMemberFromResponse(data: FamilyTreeResponse): FamilyMember {
  const person = createPersonFromResponse(data.person);

  return new FamilyMember(
    data.id,
    data.relationship as RelationshipType,
    person,
    data.createdBy,
    data.updatedBy || '',
    new Date(data.createdDate),
    data.updatedDate ? new Date(data.updatedDate) : new Date()
  );
}
