import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private apiUrl = 'https://your-backend-url.com/login'; // Replace with your actual login API URL

  constructor(private http: HttpClient) {}

  // Login function
  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, credentials, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling logic
  private handleError(error: any): Observable<never> {
    console.error('Login API error:', error); // Log error for debugging
    return throwError(() => new Error('Login failed. Please try again later.'));
  }
}
