package com.bytepushers.family.api;

import java.util.List;

public class ErrorResponse {
    private String code;
    private String message;
    private String messageKey;

    public ErrorResponse() {
    }

    public ErrorResponse(String code, String message, String messageKey) {
        this.code = code;
        this.message = message;
        this.messageKey = messageKey;
    }

    public ErrorResponse(String code, String message, String messageKey, List<ValidationErrorResponse> validationErrors) {
        this.code = code;
        this.message = message;
        this.messageKey = messageKey;
//        this.validationErrors = validationErrors;
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
}