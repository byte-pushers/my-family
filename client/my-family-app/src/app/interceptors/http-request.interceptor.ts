import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable, tap, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpError } from "../models/http/http-error";
import { HttpErrorModel } from "../models/http/http-error.model";
import { HttpErrorInfoModel } from "../models/http/http-error-info.model";
import { FamilyTreeDomainModelApiTransformer } from '../transformers/FamilyTreeDomainModelApiTransformer';
import { FamilyReunionTransformer } from '../transformers/FamilyReunionTransformer';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  readonly #registeredDomainApiTransformers = new Map<string|null, FamilyReunionTransformer>();
  constructor() {
    this.#registeredDomainApiTransformers.set('api/family-trees', new FamilyTreeDomainModelApiTransformer())
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing HTTP request', httpRequest);

    return next.handle(httpRequest).pipe(
      tap(
        (event) => {
          console.log('Incoming HTTP response', event);

          if (event instanceof HttpResponse) {
            if (event?.body) {
              const registeredDomainApiTransformer = this.#registeredDomainApiTransformers.get(event.url);

              return event.clone({ body: (registeredDomainApiTransformer != null)? registeredDomainApiTransformer.transform(event.body): event.body });
            }
          }

          return event instanceof HttpResponse ? event : event
        },
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
