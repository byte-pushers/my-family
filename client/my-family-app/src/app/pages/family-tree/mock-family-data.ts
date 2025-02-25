/**
 * @file mock-family-data.ts
 * @description This file contains mock data for the family tree, including family members and their relationships.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { FamilyMember } from '../../models/family-tree/family-member.model';
import { Person } from '../../models/family-tree/person';
import { RelationshipType } from '../../models/family-tree/relationship-type';
import { FamilyTreeResponse, PersonResponseData, createFamilyMemberFromResponse } from '../../models/family-tree/family-tree-response';

/**
 * Creates the current date in ISO string format.
 * @returns {Object} An object containing the created and updated dates.
 */
const createDates = () => ({
  created: new Date().toISOString(),
  updated: new Date().toISOString()
});

/**
 * Mock person response data.
 * @type {PersonResponseData}
 */
const MOCK_PERSON_DATA: PersonResponseData = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  birthDate: "1970-06-15",
  gender: "Male",
  createdBy: "system",
  updatedBy: null,
  createdDate: new Date().toISOString(),
  updatedDate: null
};

/**
 * Mock family tree response data.
 * @type {FamilyTreeResponse}
 */
export const MOCK_FAMILY_TREE_RESPONSE: FamilyTreeResponse = {
  id: 1,
  relationship: RelationshipType.FATHER,
  person: {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    birthDate: "1970-06-15",
    gender: "Male",
    createdBy: "system",
    updatedBy: null,
    createdDate: createDates().created,
    updatedDate: null
  },
  parent: null,
  familyMembers: [
    {
      id: 2,
      relationship: RelationshipType.MOTHER,
      person: {
        id: 2,
        firstName: "Sarah",
        lastName: "Doe",
        birthDate: "1972-03-22",
        gender: "Female",
        createdBy: "system",
        updatedBy: null,
        createdDate: createDates().created,
        updatedDate: null
      },
      parent: 1,
      familyMembers: [],
      createdBy: "system",
      updatedBy: null,
      createdDate: createDates().created,
      updatedDate: null
    },
    {
      id: 3,
      relationship: RelationshipType.CHILD,
      person: {
        id: 3,
        firstName: "Emma",
        lastName: "Doe",
        birthDate: "1995-08-12",
        gender: "Female",
        createdBy: "system",
        updatedBy: null,
        createdDate: createDates().created,
        updatedDate: null
      },
      parent: 1,
      familyMembers: [],
      createdBy: "system",
      updatedBy: null,
      createdDate: createDates().created,
      updatedDate: null
    },
    {
      id: 4,
      relationship: RelationshipType.CHILD,
      person: {
        id: 4,
        firstName: "Michael",
        lastName: "Doe",
        birthDate: "1998-11-30",
        gender: "Male",
        createdBy: "system",
        updatedBy: null,
        createdDate: createDates().created,
        updatedDate: null
      },
      parent: 1,
      familyMembers: [],
      createdBy: "system",
      updatedBy: null,
      createdDate: createDates().created,
      updatedDate: null
    },
    {
      id: 5,
      relationship: RelationshipType.GRANDPARENT,
      person: {
        id: 5,
        firstName: "Robert",
        lastName: "Doe",
        birthDate: "1945-01-15",
        gender: "Male",
        createdBy: "system",
        updatedBy: null,
        createdDate: createDates().created,
        updatedDate: null
      },
      parent: 1,
      familyMembers: [],
      createdBy: "system",
      updatedBy: null,
      createdDate: createDates().created,
      updatedDate: null
    },
    {
      id: 6,
      relationship: RelationshipType.GRANDPARENT,
      person: {
        id: 6,
        firstName: "Maria",
        lastName: "Doe",
        birthDate: "1947-04-18",
        gender: "Female",
        createdBy: "system",
        updatedBy: null,
        createdDate: createDates().created,
        updatedDate: null
      },
      parent: 1,
      familyMembers: [],
      createdBy: "system",
      updatedBy: null,
      createdDate: createDates().created,
      updatedDate: null
    },
    {
      id: 7,
      relationship: RelationshipType.GRANDPARENT,
      person: {
        id: 7,
        firstName: "George",
        lastName: "Wilson",
        birthDate: "1943-07-22",
        gender: "Male",
        createdBy: "system",
        updatedBy: null,
        createdDate: createDates().created,
        updatedDate: null
      },
      parent: 1,
      familyMembers: [],
      createdBy: "system",
      updatedBy: null,
      createdDate: createDates().created,
      updatedDate: null
    },
    {
      id: 8,
      relationship: RelationshipType.GRANDPARENT,
      person: {
        id: 8,
        firstName: "Elizabeth",
        lastName: "Wilson",
        birthDate: "1946-09-05",
        gender: "Female",
        createdBy: "system",
        updatedBy: null,
        createdDate: createDates().created,
        updatedDate: null
      },
      parent: 1,
      familyMembers: [],
      createdBy: "system",
      updatedBy: null,
      createdDate: createDates().created,
      updatedDate: null
    },
    {
      id: 9,
      relationship: RelationshipType.AUNT,
      person: {
        id: 9,
        firstName: "Jennifer",
        lastName: "Smith",
        birthDate: "1975-07-23",
        gender: "Female",
        createdBy: "system",
        updatedBy: null,
        createdDate: createDates().created,
        updatedDate: null
      },
      parent: 1,
      familyMembers: [],
      createdBy: "system",
      updatedBy: null,
      createdDate: createDates().created,
      updatedDate: null
    }
  ],
  createdBy: "system",
  updatedBy: null,
  createdDate: createDates().created,
  updatedDate: null
};

/**
 * Mock family members converted from the response data.
 * @type {FamilyMember[]}
 */
export const MOCK_FAMILY_MEMBERS: FamilyMember[] = MOCK_FAMILY_TREE_RESPONSE.familyMembers.map(
  memberData => createFamilyMemberFromResponse(memberData)
);

export { createFamilyMemberFromResponse };
