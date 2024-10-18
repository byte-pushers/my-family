package com.bytepushers.family.api;

import com.bytepushers.family.model.ErrorDetail;

public class ErrorResponse {
    private String status;
    private String message;
    private ErrorDetail error;

    public ErrorResponse() {
    }

    public ErrorResponse(String status, String message, ErrorDetail error) {
        this.status = status;
        this.message = message;
        this.error = error;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ErrorDetail getError() {
        return error;
    }

    public void setError(ErrorDetail error) {
        this.error = error;
    }
}