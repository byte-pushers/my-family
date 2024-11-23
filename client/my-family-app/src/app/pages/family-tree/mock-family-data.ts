// src/app/pages/family-tree/mock-family-data.ts
import { FamilyMember } from '../../models/family-tree/family-member.model';
import { Person } from '../../models/family-tree/person';
import { RelationshipType } from '../../models/family-tree/relationship-type';
import { FamilyTreeResponse, PersonResponseData, createFamilyMemberFromResponse } from '../../models/family-tree/family-tree-response';

const createDates = () => ({
  created: new Date().toISOString(),
  updated: new Date().toISOString()
});

// Mock person response data
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
    // Maternal Grandparents
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
    // Extended Family
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
    },
    // ... continue with the rest of the family members in the same format
  ],
  createdBy: "system",
  updatedBy: null,
  createdDate: createDates().created,
  updatedDate: null
};

// Convert the response data to FamilyMember instances
export const MOCK_FAMILY_MEMBERS: FamilyMember[] = MOCK_FAMILY_TREE_RESPONSE.familyMembers.map(
  memberData => createFamilyMemberFromResponse(memberData)
);

export { createFamilyMemberFromResponse };
