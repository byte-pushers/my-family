/**
 * @file profile-data.ts
 * @description This file contains the ProfileData interface which represents a profile with its details.
 * @version 1.0.0
 */

/**
 * Interface representing profile data.
 */
export interface ProfileData {
  id: string;           // Unique identifier for the profile
  firstName: string;    // First name of the person
  middleName?: string;  // Optional middle name of the person
  lastName: string;     // Last name of the person
  nickName?: string;    // Optional nickname of the person
  dateOfBirth: string;  // Date of birth of the person
  age: number;          // Age of the person
  email: string;        // Email address of the person
  phone?: string;       // Optional phone number of the person
  address: string;      // Address of the person
  spouse?: string;      // Optional spouse name
  children?: string[];  // Optional list of children names
  parents: {            // Parents information
    mother: string;     // Mother's name
    father: string;     // Father's name
  };
  siblings?: string[];  // Optional list of siblings' names
  profileImage?: string;// Optional profile image URL
}
