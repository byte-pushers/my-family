export class Credentials {
  #email: string;
  #password: string;

  constructor(email: string, password: string) {
    this.#email = email;
    this.#password = password;
  }

  public getUsername() {
    return this.#email;
  }

  public get username() {
    return this.#email;
  }

  public getPassword() {
    return this.#password;
  }

  public get password() {
    return this.#password;
  }

  public toString() {
    return `"credentials": {
      "email": ${this.#email},
      "password": ${this.#password}
    }`;
  }
}
