/**
 * Represents user credentials, including email and password.
 * @author Stella Choi
 */
export class Credentials {
  /** @private @property {string} #email - The email address of the user. */
  #email: string;

  /** @private @property {string} #password - The password for the user's account. */
  #password: string;

  /**
   * Constructs a new instance of the Credentials class.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password for the user's account.
   */
  constructor(email: string, password: string) {
    this.#email = email;
    this.#password = password;
  }

  /**
   * Gets the username, which is represented by the user's email.
   * @returns {string} The email address of the user.
   */
  public getUsername(): string {
    return this.#email;
  }

  /**
   * Gets the username (property accessor).
   * @returns {string} The email address of the user.
   */
  public get username(): string {
    return this.#email;
  }

  /**
   * Gets the password for the user's account.
   * @returns {string} The password for the user's account.
   */
  public getPassword(): string {
    return this.#password;
  }

  /**
   * Gets the password for the user's account (property accessor).
   * @returns {string} The password for the user's account.
   */
  public get password(): string {
    return this.#password;
  }

  /**
   * Returns a string representation of the credentials.
   * Includes the email and password in a JSON-like format.
   * @returns {string} A JSON-like string representing the credentials.
   */
  public toString(): string {
    return `"credentials": {
      "email": ${this.#email},
      "password": ${this.#password}
    }`;
  }
}
