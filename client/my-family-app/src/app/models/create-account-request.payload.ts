import { AccountInfo } from "./account-info";

/**
 * Represents the payload for creating an account request.
 * Contains transaction details and account information.
 * @author Stella Choi
 */
export class CreateAccountRequestPayload {
  /** @private @property {string} #transactionID - A unique identifier (GUID) for the transaction. */
  #transactionID: string;

  /** @private @property {AccountInfo} #accountInfo - The account information associated with the request. */
  #accountInfo: AccountInfo;

  /**
   * Constructs a new instance of CreateAccountRequestPayload.
   * Automatically generates a unique transaction ID upon initialization.
   * @param {AccountInfo} accountInfo - The account information for the request.
   */
  constructor(accountInfo: AccountInfo) {
    this.#transactionID = this.getGUID();
    this.#accountInfo = accountInfo;
  }

  /**
   * Generates a globally unique identifier (GUID) for the transaction.
   * Combines the current timestamp and a random number.
   * @private
   * @returns {string} A unique GUID.
   */
  private getGUID(): string {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNumber}`;
  }

  /**
   * Gets the transaction ID.
   * @returns {string} The unique transaction ID.
   */
  public getTransactionID(): string {
    return this.#transactionID;
  }

  /**
   * Gets the transaction ID (property accessor).
   * @returns {string} The unique transaction ID.
   */
  public get transactionID(): string {
    return this.#transactionID;
  }

  /**
   * Gets the account information associated with the request.
   * @returns {AccountInfo} The account information.
   */
  public getAccountInfo(): AccountInfo {
    return this.#accountInfo;
  }

  /**
   * Gets the account information (property accessor).
   * @returns {AccountInfo} The account information.
   */
  public get accountInfo(): AccountInfo {
    return this.#accountInfo;
  }

  /**
   * Returns a string representation of the CreateAccountRequestPayload.
   * Includes the transaction ID and account information.
   * @returns {string} A JSON-like string representing the payload.
   */
  public toString(): string {
    return `{
      "transactionId": ${this.#transactionID},
      ${this.#accountInfo},
      }`;
  }
}
