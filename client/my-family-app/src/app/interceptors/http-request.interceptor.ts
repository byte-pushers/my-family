import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from "@angular/common/http";
import { filter, Observable, tap, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpError } from "../models/http/http-error";
import { HttpErrorModel } from "../models/http/http-error.model";
import { HttpErrorInfoModel } from "../models/http/http-error-info.model";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      tap(
        (event) => (event instanceof HttpResponse ? event : event),
        (error) => {
          if (error instanceof HttpErrorResponse) {
            console.log("http error intercepted");
            error = error as HttpErrorResponse;

            if (error.status == 0 || error.statusText === `Unknown Error`) {
              error.status = 500;
              error.message = error.statusText = `Internal Server Error`;
            }
          }
        }
      ),
      catchError((error: HttpErrorResponse) => {
        const httpErrorInfoArray = [
          new HttpErrorInfoModel({
            message: error.message,
            httpStatusCode: error.status,
          }),
        ];
        return throwError(new HttpErrorModel(httpErrorInfoArray));
      })
    );
  }
}
