package com.bytepushers.family.api;

import com.bytepushers.family.model.ErrorDetail;

/**
 * The {@code ValidationErrorResponse} class is used to represent a validation error response returned
 * by the application when an input validation fails. This class contains structured information about
 * the validation error, including an error code, message, message key, and additional error details.
 *
 * <p>This class is typically used to communicate validation issues such as missing required fields,
 * invalid data types, or failed business rules when a client submits incorrect or malformed data.</p>
 *
 * <p>Example usage: If a form is submitted with missing required fields, the application can return a
 * {@code ValidationErrorResponse} with an appropriate error code and message explaining what fields need
 * to be filled.</p>
 *
 * @author Adish Timalsina
 */
public class ValidationErrorResponse {
    private String code;
    private String message;
    private String messageKey;
    private ErrorDetail errorDetail;

    /**
     * Constructor that initializes a new instance of {@code ValidationErrorResponse} with the provided
     * code, message, message key, and error details.
     *
     * @param code The error code representing the specific validation error.
     * @param message The human-readable message explaining the error.
     * @param messageKey The key associated with the error message for localization.
     * @param errorDetail The details about the validation error, such as invalid fields.
     */
    public ValidationErrorResponse(String code, String message, String messageKey, ErrorDetail errorDetail) {
        this.code = code;
        this.message = message;
        this.messageKey = messageKey;
        this.errorDetail = errorDetail;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getMessageKey() {
        return messageKey;
    }

    public void setMessageKey(String messageKey) {
        this.messageKey = messageKey;
    }

    public ErrorDetail getErrorDetail() {
        return errorDetail;
    }
    public void setErrorDetail(ErrorDetail errorDetail) {
        this.errorDetail = errorDetail;
    }

    /**
     * Returns a string representation of the {@code ValidationErrorResponse} object.
     *
     * @return A string representation of the validation error response.
     */
    @Override
    public String toString() {
        return "ValidationErrorResponse{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", messageKey='" + messageKey + '\'' +
                '}';
    }
}