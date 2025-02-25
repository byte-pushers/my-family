/**
 * Represents a phone number, including type, country code, area code, and subscriber number.
 * @author Stella Choi
 */
export class PhoneNumber {
  /** @private @property {string} #phoneType - The type of phone (e.g., mobile, home, work). */
  #phoneType: string;

  /** @private @property {string} #countryCode - The country dialing code. */
  #countryCode: string;

  /** @private @property {string} #areaCode - The area code or region-specific code. */
  #areaCode: string;

  /** @private @property {string} #subscriberNumber - The subscriber's unique phone number. */
  #subscriberNumber: string;

  /**
   * Constructs a new PhoneNumber instance.
   * @param {string} phoneType - The type of phone (e.g., mobile, home, work).
   * @param {string} countryCode - The country dialing code.
   * @param {string} areaCode - The area code or region-specific code.
   * @param {string} subscriberNumber - The subscriber's unique phone number.
   */
  constructor(phoneType: string, countryCode: string, areaCode: string, subscriberNumber: string) {
    this.#phoneType = phoneType;
    this.#countryCode = countryCode;
    this.#areaCode = areaCode;
    this.#subscriberNumber = subscriberNumber;
  }

  /**
   * Gets the type of phone (e.g., mobile, home, work).
   * @returns {string} The phone type.
   */
  public getPhoneType(): string {
    return this.#phoneType;
  }

  /**
   * Gets the type of phone (property accessor).
   * @returns {string} The phone type.
   */
  public get phoneType(): string {
    return this.#phoneType;
  }

  /**
   * Gets the country dialing code.
   * @returns {string} The country code.
   */
  public getCountryCode(): string {
    return this.#countryCode;
  }

  /**
   * Gets the country dialing code (property accessor).
   * @returns {string} The country code.
   */
  public get countryCode(): string {
    return this.#countryCode;
  }

  /**
   * Gets the area code or region-specific code.
   * @returns {string} The area code.
   */
  public getAreaCode(): string {
    return this.#areaCode;
  }

  /**
   * Gets the area code or region-specific code (property accessor).
   * @returns {string} The area code.
   */
  public get areaCode(): string {
    return this.#areaCode;
  }

  /**
   * Gets the subscriber's unique phone number.
   * @returns {string} The subscriber number.
   */
  public getSubscriberNumber(): string {
    return this.#subscriberNumber;
  }

  /**
   * Gets the subscriber's unique phone number (property accessor).
   * @returns {string} The subscriber number.
   */
  public get subscriberNumber(): string {
    return this.#subscriberNumber;
  }

  /**
   * Returns a string representation of the phone number in JSON-like format.
   * @returns {string} A JSON-like string representing the phone number.
   */
  public toString(): string {
    return `"phoneNumber": {
              "type": ${this.#phoneType},
              "country code": ${this.#countryCode},
              "area code": ${this.#areaCode},
              "subscriber number": ${this.#subscriberNumber}
            }`;
  }
}
