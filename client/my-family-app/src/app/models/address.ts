/**
 * Represents an address
 * @author Stella Choi
 */
export class Address {
  /** @private @property {string} #addressLine1 - The first line of the address, typically the street address. */
  #addressLine1: string;

  /** @private @property {string} #addressLine2 - The second line of the address, typically for apartment or suite numbers. */
  #addressLine2: string;

  /** @private @property {string} #city - The city of the address. */
  #city: string;

  /** @private @property {string} #state - The state of the address. */
  #state: string;

  /** @private @property {string} #zipcode - The postal code of the address. */
  #zipcode: string;

  /**
   * Constructs an instance of the Address class.
   * @param {string} addressLine1 - The first line of the address, e.g., street address.
   * @param {string} addressLine2 - The second line of the address, e.g., apartment or suite number.
   * @param {string} city - The city of the address.
   * @param {string} state - The state of the address.
   * @param {string} zipcode - The postal code of the address.
   */
  constructor(
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    zipcode: string
  ) {
    this.#addressLine1 = addressLine1;
    this.#addressLine2 = addressLine2;
    this.#city = city;
    this.#state = state;
    this.#zipcode = zipcode;
  }

  /**
   * Gets the first line of the address.
   * @returns {string} The first line of the address.
   */
  public getAddressLine1(): string {
    return this.#addressLine1;
  }

  /**
   * Gets the first line of the address (property accessor).
   * @returns {string} The first line of the address.
   */
  public get addressLine1(): string {
    return this.#addressLine1;
  }

  /**
   * Gets the second line of the address.
   * @returns {string} The second line of the address.
   */
  public getAddressLine2(): string {
    return this.#addressLine2;
  }

  /**
   * Gets the second line of the address (property accessor).
   * @returns {string} The second line of the address.
   */
  public get addressLine2(): string {
    return this.#addressLine2;
  }

  /**
   * Gets the city of the address.
   * @returns {string} The city of the address.
   */
  public getCity(): string {
    return this.#city;
  }

  /**
   * Gets the city of the address (property accessor).
   * @returns {string} The city of the address.
   */
  public get city(): string {
    return this.#city;
  }

  /**
   * Gets the state of the address.
   * @returns {string} The state of the address.
   */
  public getState(): string {
    return this.#state;
  }

  /**
   * Gets the state of the address (property accessor).
   * @returns {string} The state of the address.
   */
  public get state(): string {
    return this.#state;
  }

  /**
   * Gets the postal code of the address.
   * @returns {string} The postal code of the address.
   */
  public getZipcode(): string {
    return this.#zipcode;
  }

  /**
   * Gets the postal code of the address (property accessor).
   * @returns {string} The postal code of the address.
   */
  public get zipcode(): string {
    return this.#zipcode;
  }

  /**
   * Returns a string representation of the address.
   * @returns {string} The address in string format.
   */
  public toString(): string {
    return `"address": {
              "address line1": ${this.#addressLine1},
              "address line2": ${this.#addressLine2},
              "city": ${this.#city},
              "state": ${this.#state},
              "zipcode": ${this.#zipcode}
            }`;
  }
}
