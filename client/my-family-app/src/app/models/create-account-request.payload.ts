import { AccountInfo } from "./account-info";

export class CreateAccountRequestPayload {
  #transactionID: string; // GUID
  #accountInfo: AccountInfo;

  constructor(transactionID: string, accountInfo: AccountInfo) {
    this.#transactionID = transactionID; // TODO: remove transactionID from parameter and this line
    // TODO: generate transactionID method to create GUID transaction ID
    this.#accountInfo = accountInfo;
  }

  public getTransactionID() {
    return this.#transactionID;
  }
  get transactionID() {
    return this.#transactionID;
  }

  public getAccountInfo() {
    return this.#accountInfo;
  }
  get accountInfo() {
    return this.#accountInfo;
  }

  public toString(): string {
    return `{
      "transactionId": ${this.#transactionID}
      "accountInfo": {
        "firstName": ${this.#accountInfo.firstName},
        "middleName": ${this.#accountInfo.middleName},
        "lastName": ${this.#accountInfo.lastName},
        "email": ${this.#accountInfo.email},
        "phoneNumber": ${this.#accountInfo.phoneNumber},
        "address": {
          "address line1": ${this.#accountInfo.address.addressLine1},
          "address line2": ${this.#accountInfo.address.addressLine2},
          "city": ${this.#accountInfo.address.city},
          "state": ${this.#accountInfo.address.state},
          "zipcode": ${this.#accountInfo.address.zipcode}
        } | null | undefined
      }
    }`;
  }
}
