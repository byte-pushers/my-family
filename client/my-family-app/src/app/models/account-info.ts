import { Address } from './address';
import { PhoneNumber } from './phone-number';

/**
 * Represents account information for a user
 * @author Stella Choi
 */
export class AccountInfo {
  /** @private @property {string} #firstName - The first name of the account holder. */
  #firstName: string;

  /** @private @property {string} #middleName - The middle name of the account holder. */
  #middleName: string;

  /** @private @property {string} #lastName - The last name of the account holder. */
  #lastName: string;

  /** @private @property {string} #email - The email address of the account holder. */
  #email: string;

  /** @private @property {string} #password - The password for the account. */
  #password: string;

  /** @private @property {PhoneNumber} #phoneNumber - The phone number of the account holder. */
  #phoneNumber: PhoneNumber;

  /** @private @property {Address} #address - The address of the account holder. */
  #address: Address;

  /**
   * Constructs an instance of the AccountInfo class.
   * @param {string} firstName - The first name of the account holder.
   * @param {string} middleName - The middle name of the account holder.
   * @param {string} lastName - The last name of the account holder.
   * @param {string} email - The email address of the account holder.
   * @param {string} password - The password for the account.
   * @param {PhoneNumber} phoneNumber - The phone number of the account holder.
   * @param {Address} address - The address of the account holder.
   */
  constructor(firstName: string, middleName: string, lastName: string, email: string, password: string, phoneNumber: PhoneNumber, address: Address) {
    this.#firstName = firstName;
    this.#middleName = middleName;
    this.#lastName = lastName;
    this.#email = email;
    this.#password = password;
    this.#phoneNumber = phoneNumber;
    this.#address = address;
  }

  /**
   * Gets the first name of the account holder.
   * @returns {string} The first name.
   */
  public getFirstName(): string {
    return this.#firstName;
  }

  /**
   * Gets the first name of the account holder (property accessor).
   * @returns {string} The first name.
   */
  public get firstName(): string {
    return this.#firstName;
  }

  /**
   * Gets the middle name of the account holder.
   * @returns {string} The middle name.
   */
  public getMiddleName(): string {
    return this.#middleName;
  }

  /**
   * Gets the middle name of the account holder (property accessor).
   * @returns {string} The middle name.
   */
  public get middleName(): string {
    return this.#middleName;
  }

  /**
   * Gets the last name of the account holder.
   * @returns {string} The last name.
   */
  public getLastName(): string {
    return this.#lastName;
  }

  /**
   * Gets the last name of the account holder (property accessor).
   * @returns {string} The last name.
   */
  public get lastName(): string {
    return this.#lastName;
  }

  /**
   * Gets the email address of the account holder.
   * @returns {string} The email address.
   */
  public getEmail(): string {
    return this.#email;
  }

  /**
   * Gets the email address of the account holder (property accessor).
   * @returns {string} The email address.
   */
  public get email(): string {
    return this.#email;
  }

  /**
   * Gets the password of the account holder.
   * @returns {string} The password.
   */
  public getPassword(): string {
    return this.#password;
  }

  /**
   * Gets the password of the account holder (property accessor).
   * @returns {string} The password.
   */
  public get password(): string {
    return this.#password;
  }

  /**
   * Gets the phone number of the account holder.
   * @returns {PhoneNumber} The phone number.
   */
  public getPhoneNumber(): PhoneNumber {
    return this.#phoneNumber;
  }

  /**
   * Gets the phone number of the account holder (property accessor).
   * @returns {PhoneNumber} The phone number.
   */
  public get phoneNumber(): PhoneNumber {
    return this.#phoneNumber;
  }

  /**
   * Gets the address of the account holder.
   * @returns {Address} The address.
   */
  public getAddress(): Address {
    return this.#address;
  }

  /**
   * Gets the address of the account holder (property accessor).
   * @returns {Address} The address.
   */
  public get address(): Address {
    return this.#address;
  }

  /**
   * Returns a string representation of the account information.
   * @returns {string} The account information in string format.
   */
  public toString(): string {
    return `"accountInfo": {
              "firstName": ${this.#firstName},
              "middleName": ${this.#middleName},
              "lastName": ${this.#lastName},
              "email": ${this.#email},
              "password": ${this.#password},
              ${this.#phoneNumber},
              ${this.#address}
            }`;
  }
}
