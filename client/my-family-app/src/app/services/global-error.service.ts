import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ApiError } from "../models/api-error";


export class GlobalErrorService {
  private errorSubject = new BehaviorSubject<ApiError[]>([]);

  // This will allow components to subscribe and listen for errors
  getErrorMessages(): Observable<ApiError[]> {
    return this.errorSubject.asObservable();
  }

  publishErrors(errors: ApiError[]): void {
    this.errorSubject.next(errors);
  }
}
