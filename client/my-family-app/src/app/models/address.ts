/**
 * Interface representing an address.
 * @author Stella Choi
 */
export interface Address {
  /** @property {string} addressLine1 - The first line of the address, typically the street address. */
  addressLine1: string;

  /** @property {string} addressLine2 - The second line of the address, typically for apartment or suite numbers. */
  addressLine2: string;

  /** @property {string} city - The city of the address. */
  city: string;

  /** @property {string} state - The state of the address. */
  state: string;

  /** @property {string} zipcode - The postal code of the address. */
  zipcode: string;

}
