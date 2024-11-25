/**
 * Represents user credentials, including email and password.
 * @author Stella Choi
 */
export interface Credentials {
  /** @private @property {string} #email - The email address of the user. */
  email: string;

  /** @private @property {string} #password - The password for the user's account. */
  password: string;
}
