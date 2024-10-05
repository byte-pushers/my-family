import { Credentials } from "./credentials";

export class LoginRequestPayload {
  #transactionID: string;
  #credentials: Credentials;

  constructor(credentials: Credentials) {
    this.#transactionID = this.getGUID();
    this.#credentials = credentials;
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

  public getCredentials() {
    return this.#credentials;
  }

  public get credentials() {
    return this.#credentials;
  }

  public toString(): string {
    return `{
      "transactionId": ${this.#transactionID},
      ${this.#credentials},
      }`;
  }
}
