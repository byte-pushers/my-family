import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FamilyTreeRequestPayload } from '../models/family-tree-request.payload';  // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class FamilyTreeService {
  private apiUrl = 'http://localhost:8100/api/family-tree'; // Replace with actual API URL (ask whose working on it)

  constructor(private http: HttpClient) {}

  // Method to submit the family tree data
  public submitFamilyTree(payload: FamilyTreeRequestPayload): Observable<any> {
    payload = {
      parentName: "John you",
      parentType: "no Father",
      grandParentName: "Robert Doe",
      grandParentType: "Grandfather",
      siblingName: "Jane Doe",
      siblingType: "Sister",
      spouseName: "Mary Doe",
      spouseType: "Wife",
      childrenName: "Jack Doe",
      childrenType: "Son"
    } as FamilyTreeRequestPayload;

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Version': '0.0.0.1',
      'Authorization': 'Basic ' + btoa('username:password')// Add more version numbers as needed
    });

    console.log(`payload: ${JSON.stringify(payload)}`, payload);

    return this.http.post<any>(this.apiUrl, payload, {
      headers: headers,
      responseType: 'json',
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
