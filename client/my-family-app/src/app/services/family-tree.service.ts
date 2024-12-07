import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FamilyTreeRequestPayload } from '../models/family-tree/family-tree-request.payload';
import { FamilyTreeResponse } from '../models/family-tree/family-tree-response';
import { FamilyTree } from '../models/family-tree/family-tree';

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
      'Authorization': 'Basic ' + btoa('john@doe.com:123456')
    });
  }

  // POST - Submit the family tree data
  public create(payload: FamilyTreeRequestPayload): Observable<FamilyTree> {
    console.log(`payload: ${JSON.stringify(payload)}`, payload);
    return new Observable<FamilyTree>((observer) => {
      return this.http.post<FamilyTreeResponse>(`${this.apiBaseUrl}/family-trees/`, payload, {
        headers: this.getHeaders()
      }).subscribe(familyTreeResponse => {
        observer.next(familyTreeResponse.data);
      });
    });
  }

  // GET - Retrieve family tree by ID
  public getFamilyTree(id: number): Observable<FamilyTree> {
    return new Observable<FamilyTree>((observer) => {
      return this.http.get<FamilyTreeResponse>(`${this.apiBaseUrl}/family-trees/${id}`, {
        headers: this.getHeaders()
      }).subscribe(familyTreeResponse => {
        observer.next(familyTreeResponse.data);
      });
    });

  }

  // UPDATE - Adding additional family members after initial creation
  public updateFamilyTree(id: number, payload: FamilyTreeRequestPayload): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/family-trees/${id}`, payload, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE - Deleting family member from family tree
  public deleteFamilyTree(id: number): Observable<FamilyTreeResponse> {
    return this.http.delete<FamilyTreeResponse>(`${this.apiBaseUrl}/family-trees/${id}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
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
