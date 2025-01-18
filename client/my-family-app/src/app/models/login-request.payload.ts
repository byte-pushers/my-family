import { Credentials } from './credentials';

/**
 * Represents the payload for a login request, including transaction ID and user credentials.
 * @author Stella Choi
 */
export class LoginRequestPayload {
  /** @private @property {string} #transactionID - A unique identifier for the transaction. */
  #transactionID: string;

  /** @private @property {Credentials} #credentials - The user credentials for login. */
  #credentials: Credentials;

  /**
   * Constructs a new instance of the LoginRequestPayload class.
   * @param {Credentials} credentials - The credentials object containing email and password.
   */
  constructor(credentials: Credentials) {
    this.#transactionID = this.getGUID();
    this.#credentials = credentials;
  }

  /**
   * Generates a globally unique identifier (GUID) for the transaction.
   * Combines a timestamp with a random number to ensure uniqueness.
   * @private
   * @returns {string} A unique transaction ID.
   */
  private getGUID(): string {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);

    return `${timestamp}-${randomNumber}`;
  }

  /**
   * Gets the unique transaction ID.
   * @returns {string} The transaction ID.
   */
  public getTransactionID(): string {
    return this.#transactionID;
  }

  /**
   * Gets the unique transaction ID (property accessor).
   * @returns {string} The transaction ID.
   */
  public get transactionID(): string {
    return this.#transactionID;
  }

  /**
   * Gets the user credentials associated with the login request.
   * @returns {Credentials} The user credentials object.
   */
  public getCredentials(): Credentials {
    return this.#credentials;
  }

  /**
   * Gets the user credentials associated with the login request (property accessor).
   * @returns {Credentials} The user credentials object.
   */
  public get credentials(): Credentials {
    return this.#credentials;
  }

  /**
   * Returns a string representation of the login request payload.
   * Includes the transaction ID and the credentials in a JSON-like format.
   * @returns {string} A JSON-like string representing the login request payload.
   */
  public toString(): string {
    return `{
      "transactionId": ${this.#transactionID},
      ${this.#credentials},
    }`;
  }
}
