export class PhoneNumber {
  #phoneType: string;
  #countryCode: string;
  #areaCode: string;
  #subscriberNumber: string;

  constructor(phoneType: string, countryCode: string, areaCode: string, subscriberNumber: string) {
    this.#phoneType = phoneType;
    this.#countryCode = countryCode;
    this.#areaCode = areaCode;
    this.#subscriberNumber = subscriberNumber;
  }

  public getPhoneType(): string {
    return this.#phoneType;
  }

  public get phoneType(): string {
    return this.#phoneType;
  }

  public getCountryCode(): string {
    return this.#countryCode;
  }

  public get countryCode(): string {
    return this.#countryCode;
  }

  public getAreaCode(): string {
    return this.#areaCode;
  }

  public get areaCode(): string {
    return this.#areaCode;
  }

  public getSubscriberNumber(): string {
    return this.#subscriberNumber;
  }

  public get subscriberNumber(): string {
    return this.#subscriberNumber;
  }

  public toString(): string {
    return `"phoneNumber": {
              "type": ${this.#phoneType},
              "country code": ${this.#countryCode},
              "area code": ${this.#areaCode},
              "subscriber number": ${this.#subscriberNumber}
            }`;
  }
}
