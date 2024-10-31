package com.bytepushers.family.api;

import com.bytepushers.family.model.ErrorDetail;

import java.util.List;

public class ErrorResponse {
    private String code;
    private String message;
    private String messageKey;
    ErrorDetail details;

    public ErrorResponse() {
    }

    public ErrorResponse(String code, String message, String messageKey) {
        this(code, message, messageKey, null);
    }

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