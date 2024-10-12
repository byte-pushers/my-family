import {ErrorHandler, Injectable} from "@angular/core";
import {GlobalErrorService} from "../services/GlobalError.service";
import {ApiError} from "../models/ApiError.model"
import {errorMessagesMap} from "./errorMessageMap";

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private globalErrorService: GlobalErrorService) {
  }

  handleError(error: any): void {

    if (error) {
      const userFriendlyErrors = error.map((err: ApiError) => {
        const userMessage = errorMessagesMap[err.code] || 'Unknown error occurred';
        //console.log(err.code, userMessage);

        return {code: err.code, message: userMessage};
      });

      // Publish the errors to be handled by any subscriber
      this.globalErrorService.publishErrors(userFriendlyErrors);
    }


    // console.error('An error occurred:', error);

  }
}
