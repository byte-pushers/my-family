package com.bytepushers.family.api;

import com.bytepushers.family.model.ErrorDetail;

public class ValidationErrorResponse {
    private String code;
    private String message;
    private String messageKey;
    private ErrorDetail errorDetail;

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

    @Override
    public String toString() {
        return "ValidationErrorResponse{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", messageKey='" + messageKey + '\'' +
                '}';
    }
}