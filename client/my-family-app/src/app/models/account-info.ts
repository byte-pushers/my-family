import { Address } from "./address";
import { PhoneNumber } from "./phone-number";

export class AccountInfo {
  #firstName: string;
  #middleName: string;
  #lastName: string;
  #email: string;
  #password: string;
  #phoneNumber: PhoneNumber;
  #address: Address;

  constructor(firstName: string, middleName: string, lastName: string, email: string, password: string, phoneNumber: PhoneNumber, address: Address) {
    this.#firstName = firstName;
    this.#middleName = middleName;
    this.#lastName = lastName;
    this.#email = email;
    this.#password = password;
    this.#phoneNumber = phoneNumber;
    this.#address = address;
  }

  public getFirstName(): string {
    return this.#firstName;
  }

  public get firstName(): string {
    return this.#firstName;
  }

  public getMiddleName(): string {
    return this.#middleName;
  }

  public get middleName(): string {
    return this.#middleName;
  }

  public getLastName(): string {
    return this.#lastName;
  }

  public get lastName(): string {
    return this.#lastName;
  }

  public getEmail(): string {
    return this.#email;
  }

  public get email(): string {
    return this.#email;
  }

  public getPassword(): string {
    return this.#password;
  }

  public get password(): string {
    return this.#password;
  }

  public getPhoneNumber(): PhoneNumber {
    return this.#phoneNumber;
  }

  public get phoneNumber(): PhoneNumber {
    return this.#phoneNumber;
  }

  public getAddress(): Address {
    return this.#address;
  }

  public get address(): Address {
    return this.#address;
  }

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
