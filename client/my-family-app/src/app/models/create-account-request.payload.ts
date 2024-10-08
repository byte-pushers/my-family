import { AccountInfo } from "./account-info";

export class CreateAccountRequestPayload {
  #transactionID: string; // GUID
  #accountInfo: AccountInfo;

  constructor(accountInfo: AccountInfo) {
    this.#transactionID = this.getGUID();
    this.#accountInfo = accountInfo;
  }

  private getGUID(): string {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);

    return `${timestamp}-${randomNumber}`;
  }

  public getTransactionID() {
    return this.#transactionID;
  }

  public get transactionID() {
    return this.#transactionID;
  }

  public getAccountInfo() {
    return this.#accountInfo;
  }

  public get accountInfo() {
    return this.#accountInfo;
  }

  public toString(): string {
    return `{
      "transactionId": ${this.#transactionID},
      ${this.#accountInfo},
      }`;
  }
}
