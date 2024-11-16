import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from '../models/event';  // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiBaseUrl = '/api/event'; // Replace with the actual API URL (ask who is working on it)

  constructor(private http: HttpClient) {}

  // Method to save the event data
  public saveEvent(event: Event): Observable<Event> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Version': '0.0.0.1',
      'Authorization': 'Basic ' + btoa('john:12345')
    });

    console.log(`Event payload: ${JSON.stringify(event)}`, event);

    return this.http.post<Event>(`${this.apiBaseUrl}/event`, event, {
      headers: headers
    }).pipe(
      catchError(this.handleError)  // Handle errors
    );
  }

  // Error handling logic
  private handleError(error: any): Observable<never> {
    console.error('Event API error:', error);  // Log error for debugging
    return throwError(() => new Error('Event submission failed. Please try again later.'));
  }
}
