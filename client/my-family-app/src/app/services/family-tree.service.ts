import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FamilyTreeRequestPayload } from '../models/family-tree/family-tree-request.payload';
import { FamilyTreeResponse } from '../models/family-tree/family-tree-response';
import { FamilyTree } from '../models/family-tree/family-tree';

/**
 * Service for managing family tree data through API calls.
 *
 * @author Danny Amezquita
 */
@Injectable({
  providedIn: 'root'
})
export class FamilyTreeService {
  private apiBaseUrl = '/api'; // Replace it with actual API URL (ask whose working on it)

  constructor(private http: HttpClient) {}

  /**
   * Generates HTTP headers for API requests.
   * @returns {HttpHeaders} The HTTP headers with content type, accept, API version, and authorization.
   */
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
      return this.http.post<FamilyTreeResponse>(`${this.apiBaseUrl}/family-trees`, payload, {
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
      }).subscribe((response: any) => {
        // Create a FamilyTreeResponse structure
        const familyTreeResponse: FamilyTreeResponse = {
          data: response  // The raw response IS our FamilyTree
        };
        observer.next(familyTreeResponse.data);
      });
    });
  }

  /**
   * Updates an existing family tree.
   * @param {number} id - The ID of the family tree to update.
   * @param {FamilyTreeRequestPayload} payload - The updated family tree data.
   * @returns {Observable<any>} An observable that emits the server response.
   */
  public updateFamilyTree(id: number, payload: FamilyTreeRequestPayload): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/family-trees/${id}`, payload, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a family tree.
   * @param {number} id - The ID of the family tree to delete.
   * @returns {Observable<FamilyTreeResponse>} An observable that emits the server response.
   */
  public deleteFamilyTree(id: number): Observable<FamilyTreeResponse> {
    return this.http.delete<FamilyTreeResponse>(`${this.apiBaseUrl}/family-trees/${id}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles errors from API requests.
   * @param {any} error - The error object.
   * @returns {Observable<never>} An observable that emits the error.
   */
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
