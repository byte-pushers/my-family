import { Address } from "./address";

export class AccountInfo {
  // TODO: refactor to # syntax
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public address: Address;

  constructor(firstName: string, middleName: string, lastName: string, email: string, phoneNumber: string, address: Address) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
  // TODO: add the special case getters
  getFirstName(): string {
    return this.firstName;
  }

  getMiddleName(): string {
    return this.middleName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): string {
    return this.email;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getAddress(): Address {
    return this.address;
  }

  // TODO: overwrite toString method
}
