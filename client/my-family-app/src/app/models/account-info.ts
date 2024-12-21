import { Address } from './address';
import { PhoneNumber } from './phone-number';

/**
 * Interface representing an account information for a user.
 * @author Stella Choi
 */
export interface AccountInfo {
  /** @property {string} firstName - The first name of the account holder. */
  firstName: string | null;

  /** @property {string} middleName - The middle name of the account holder. */
  middleName: string | null;

  /** @property {string} lastName - The last name of the account holder. */
  lastName: string | null;

  /** @property {string} email - The email address of the account holder. */
  email: string | null;

  /** @property {string} password - The password for the account. */
  password: string | null;

  /** @property {PhoneNumber} phoneNumber - The phone number of the account holder. */
  phoneNumber: PhoneNumber | null;

  /** @property {Address} address - The address of the account holder. */
  address: Address | null;
}
