import {ErrorHandler, Injectable} from "@angular/core";
import {GlobalErrorService} from "../services/global-error.service";
import {ApiError} from "../models/api-error"
import {errorMessagesMap} from "./error-message-map";
import {key} from "ionicons/icons";

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private globalErrorService: GlobalErrorService) {
    }

    handleError(error: any): void {

        if (error) {

            const userFriendlyErrors = error.map((err: ApiError) => {

                const seenFields = new Set();
                let message: string[] = [];

                let userMessage: string = "Unknown error occurred"

                if (err.details && err.details.fieldName) {

                    err.details.fieldName.forEach(field => {

                        if (!seenFields.has(field)) {
                            seenFields.add(field)
                            userMessage = errorMessagesMap.get(err.code) ?? userMessage;

                            while (userMessage.includes(`${0}`)) {
                                userMessage = userMessage.replace(`${0}`, field)

                            }
                            message.push(userMessage);
                        }
                    })

                }
                return {code: err.code, message: message};
            });

            // Publish the errors to be handled by any subscriber
            this.globalErrorService.publishErrors(userFriendlyErrors);
        }


        // console.error('An error occurred:', error);

    }
}
