package com.bytepushers.family.api;

public class ValidationErrorResponse {
    private int code;
    private String message;
    private String messageKey;

    public ValidationErrorResponse(int code, String message, String messageKey) {
        this.code = code;
        this.message = message;
        this.messageKey = messageKey;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
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

    @Override
    public String toString() {
        return "ValidationErrorResponse{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", messageKey='" + messageKey + '\'' +
                '}';
    }
}