/**
 * @file relationship-type.ts
 * @description This file contains the NameType and RelationshipType enums which represent different types of names and family relationships.
 * @version 1.0.0
 * @author Danny Amezquita
 */

/**
 * Enum representing different types of names.
 */
export enum NameType {
  FIRST_NAME = 'First Name',
  LAST_NAME = 'Last Name',
  FULL_NAME = 'Full Name'
}

/**
 * Enum representing different types of family relationships.
 */
export enum RelationshipType {
  FATHER = 'Father',
  MOTHER = 'Mother',
  SIBLING = 'Sibling',
  SPOUSE = 'Spouse',
  CHILD = 'Child',
  COUSIN = 'Cousin',
  UNCLE = 'Uncle',
  AUNT = 'Aunt',
  GRANDPARENT = 'Grandparent',
  OTHER = 'Other',
  SELF = 'SELF',
}
