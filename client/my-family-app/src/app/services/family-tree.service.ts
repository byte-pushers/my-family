import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FamilyTreeRequestPayload } from '../models/family-tree/family-tree-request.payload';
import { FamilyTreeResponse } from '../models/family-tree/family-tree-response';

@Injectable({
  providedIn: 'root'
})
export class FamilyTreeService {
  private apiBaseUrl = '/api'; // Replace with actual API URL (ask whose working on it)

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-API-Version': '1.0.0',
      'Authorization': 'Basic ' + btoa('john:12345')
    });
  }

  // Method to submit the family tree data
  public create(payload: FamilyTreeRequestPayload): Observable<any> {

    console.log(`payload: ${JSON.stringify(payload)}`, payload);

    return this.http.post<any>(this.apiBaseUrl + '/family-tree', payload, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // GET - Retrieve family tree by ID
  public getFamilyTree(id: number): Observable<FamilyTreeResponse> {
    return this.http.get<FamilyTreeResponse>(`${this.apiBaseUrl}/family-tree/${id}`)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            // Handle not found
            console.error('Family tree not found:', error);
          }
          return throwError(() => error);
        })
      );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error('Family Tree API error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
