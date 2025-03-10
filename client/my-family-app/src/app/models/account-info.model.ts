import { AddressModel } from './address.model';
import { PhoneNumberModel } from './phone-number.model';
import { Address } from './address';
import { AccountInfo } from './account-info';
import { PhoneNumber } from './phone-number';

export class AccountInfoModel implements AccountInfo {
  #firstName: string | null;
  #middleName: string | null;
  #lastName: string | null;
  #email: string | null;
  #password: string | null;
  #phoneNumber: PhoneNumber | null;
  #address: Address | null;

  constructor(props: any/*firstName: string, middleName: string, lastName: string, email: string, password: string, phoneNumber: PhoneNumberModel, address: AddressModel*/) {
    this.#firstName = props && props.firstName;
    this.#middleName = props && props.middleName;
    this.#lastName = props && props.lastName;
    this.#email = props && props.email;
    this.#password = props && props.password;
    this.#phoneNumber = props && props.phoneNumber? new PhoneNumberModel(props.phoneNumber): null;
    this.#address = props && props.address? new AddressModel(props.address): null;
  }

  public getFirstName(): string | null {
    return this.#firstName;
  }

  public get firstName(): string | null {
    return this.#firstName;
  }

  public getMiddleName(): string | null {
    return this.#middleName;
  }

  public get middleName(): string | null {
    return this.#middleName;
  }

  public getLastName(): string | null {
    return this.#lastName;
  }

  public get lastName(): string | null {
    return this.#lastName;
  }

  public getEmail(): string | null {
    return this.#email;
  }

  public get email(): string | null {
    return this.#email;
  }

  public getPassword(): string | null {
    return this.#password;
  }

  public get password(): string | null {
    return this.#password;
  }

  public getPhoneNumber(): PhoneNumber | null {
    return this.#phoneNumber;
  }

  public get phoneNumber(): PhoneNumber | null {
    return this.#phoneNumber;
  }

  public getAddress(): Address | null {
    return this.#address;
  }

  public get address(): Address | null {
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
