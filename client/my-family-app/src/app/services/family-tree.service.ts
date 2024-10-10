import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FamilyTreeRequestPayload } from '../models/family-tree-request.payload';  // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class FamilyTreeService {
  // Use JavaScript true private variable
  #apiUrl = 'https://your-backend-url.com/family-tree';  // Replace with actual API URL

  constructor(private http: HttpClient) {}

  // Method to submit the family tree data
  submitFamilyTree(payload: FamilyTreeRequestPayload): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Use the true private variable #apiUrl
    return this.http.post(this.#apiUrl, payload, { headers })
      .pipe(
        catchError(this.#handleError.bind(this))  // Handle errors
      );
  }

  // Error handling logic
  #handleError(error: any): Observable<never> {
    console.error('Family Tree API error:', error);  // Log error for debugging
    return throwError(() => new Error('Submission failed. Please try again later.'));
  }
}
