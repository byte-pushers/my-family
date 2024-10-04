import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders }  from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { CreateAccountRequestPayload } from "../models/create-account-request.payload";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class CreateAccountService {
  private apiUrl = 'http://localhost:8080/api/v1/create-account'; // 8100 ?

  constructor (private http: HttpClient) {
  }

  public createAccount(createAccountRequestPayload: CreateAccountRequestPayload): Observable</*CreateAccountResponse|CreateAccountErrorResponse*/any> {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Version': '0.0.0.1' // Add more version numbers as needed
    });

    const payload = createAccountRequestPayload;
    console.log(`payload: ${payload}`, payload);

    return this.http.post</*CreateAccountResponse|CreateAccountErrorResponse*/any>(this.apiUrl, payload, {
      headers: header,
      responseType: "json",
    });
  }
}
