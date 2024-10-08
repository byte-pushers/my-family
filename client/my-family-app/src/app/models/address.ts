export class Address {
  #addressLine1: string;
  #addressLine2: string;
  #city: string;
  #state: string;
  #zipcode: string;

  constructor(addressLine1: string, addressLine2: string, city: string, state: string, zipcode: string) {
    this.#addressLine1 = addressLine1;
    this.#addressLine2 = addressLine2;
    this.#city = city;
    this.#state = state;
    this.#zipcode = zipcode;
  }

  public getAddressLine1(): string {
    return this.#addressLine1;
  }

  public get addressLine1(): string {
    return this.#addressLine1;
  }

  public getAddressLine2(): string {
    return this.#addressLine2;
  }

  public get addressLine2(): string {
    return this.#addressLine2;
  }

  public getCity(): string {
    return this.#city;
  }

  public get city(): string {
    return this.#city;
  }

  public getState(): string {
    return this.#state;
  }

  public get state(): string {
    return this.#state;
  }

  public getZipcode(): string {
    return this.#zipcode;
  }

  public get zipcode(): string {
    return this.#zipcode;
  }

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
