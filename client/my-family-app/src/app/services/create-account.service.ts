import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders }  from "@angular/common/http";
import { CreateAccountRequestPayload } from "../models/create-account-request.payload";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})

/**
 * Service responsible for creating new user accounts via HTTP requests.
 * @author Stella Choi
 */
export class CreateAccountService {
  /** @private @property {string} apiUrl - The url for the create account api */
  private apiUrl = 'http://localhost:8100/api/v1/create-account';

  constructor(private http: HttpClient) {}

  /**
   * Sends a request to create a new account.
   * @param createAccountRequestPayload - The payload containing the necessary data to create an account.
   * @returns An Observable that emits the response or error from the API.
   */
  public createAccount(createAccountRequestPayload: CreateAccountRequestPayload): Observable<any> {
    // Headers to be sent with the request
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Version': '0.0.0.1' // Specify any required API versioning
    });

    // Log the payload for debugging purposes
    console.log(`Payload: ${JSON.stringify(createAccountRequestPayload)}`, createAccountRequestPayload);

    // Make the HTTP POST request to create the account
    return this.http.post<any>(this.apiUrl, createAccountRequestPayload, {
      headers: headers,
      responseType: 'json',
    });
  }
}
