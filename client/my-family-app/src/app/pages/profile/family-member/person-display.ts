/**
 * @file person-display.ts
 * @description This file defines the PersonDisplay interface
 * which represents a displayable person with optional nickname and address.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Person } from "src/app/models/family-tree/person";

/**
 * Interface representing a displayable person with optional nickname and address.
 */
export interface PersonDisplay {
  /**
   * The person object containing detailed information.
   */
  person: Person;

  /**
   * The optional nickname of the person.
   */
  nickname?: string;

  /**
   * The address of the person.
   */
  address: string;
}
