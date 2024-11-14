import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FamilyTreeRequestPayload } from '../models/family-tree-request.payload';  // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class FamilyTreeService {
  private apiBaseUrl = '/api'; // Replace with actual API URL (ask whose working on it)

  constructor(private http: HttpClient) {}

  // Method to submit the family tree data
  public submitFamilyTree(payload: FamilyTreeRequestPayload): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Version': '0.0.0.1',
      'Authorization': 'Basic ' + btoa('john:12345')
    });

    console.log(`payload: ${JSON.stringify(payload)}`, payload);

    return this.http.post<any>(this.apiBaseUrl + '/family-tree', payload, {
      headers: headers
    }).pipe(
      catchError(this.handleError)  // Handle errors
    );
  }

  // Error handling logic
  private handleError(error: any): Observable<never> {
    console.error('Family Tree API error:', error);  // Log error for debugging
    return throwError(() => new Error('Submission failed. Please try again later.'));
  }
}
