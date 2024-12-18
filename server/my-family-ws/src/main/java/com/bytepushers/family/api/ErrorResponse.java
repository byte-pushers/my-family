package com.bytepushers.family.api;

import com.bytepushers.family.model.ErrorDetail;

import java.util.List;

/**
 * The {@code ErrorResponse} class is used to represent an error response returned by the application
 * when an exception or error occurs during the processing of a request. This class provides structured
 * information about the error, including an error code, message, optional message key, and additional details.
 *
 * <p>The error response is typically returned to the client, helping them to understand the nature of
 * the error and, if necessary, how to resolve it. The class can be extended to include further details,
 * such as specific field-level error information.</p>
 *
 * <p>Example usage: In case of invalid input, the system can return an error response with a specific code
 * like "E008" (Invalid input) and a corresponding message explaining what went wrong.</p>
 *
 * @author Adish Timalsina
 */
public class ErrorResponse {
    private String code;
    private String message;
    private String messageKey;
    ErrorDetail details;

    /**
     * Default constructor.
     * Initializes a new instance of {@code ErrorResponse} without any properties set.
     */
    public ErrorResponse() {
    }

    /**
     * Constructor that initializes the error response with the given code, message, and message key.
     * The details field will be set to {@code null}.
     *
     * @param code The error code that represents the specific error.
     * @param message A human-readable message describing the error.
     * @param messageKey The key associated with the error message for localization.
     */
    public ErrorResponse(String code, String message, String messageKey) {
        this(code, message, messageKey, null);
    }

    /**
     * Constructor that initializes the error response with the given code, message, message key,
     * and optional error details.
     *
     * @param code The error code representing the specific error.
     * @param message A human-readable message describing the error.
     * @param messageKey The key associated with the error message for localization.
     * @param details Additional error details (optional).
     */
    public ErrorResponse(String code, String message, String messageKey, ErrorDetail details) {
        this.code = code;
        this.message = message;
        this.messageKey = messageKey;
        this.details = details;
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

    public String getMessageKey() {
        return messageKey;
    }

    public void setMessageKey(String messageKey) {
        this.messageKey = messageKey;
    }

    public ErrorDetail getDetails() { return details; }

    public void setDetails(ErrorDetail details) { this.details = details; }
}