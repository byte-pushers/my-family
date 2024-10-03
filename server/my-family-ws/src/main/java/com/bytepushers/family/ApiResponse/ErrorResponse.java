package com.bytepushers.family.ApiResponse;

public class ErrorResponse<T> {
    private T status;
    private T message;
    private ErrorDetail error;

    public ErrorResponse() {
    }

    public ErrorResponse(T status, T message, ErrorDetail error) {
        this.status = status;
        this.message = message;
        this.error = error;
    }

    public T getStatus() {
        return status;
    }

    public void setStatus(T status) {
        this.status = status;
    }

    public T getMessage() {
        return message;
    }

    public void setMessage(T message) {
        this.message = message;
    }

    public ErrorDetail getError() {
        return error;
    }

    public void setError(ErrorDetail error) {
        this.error = error;
    }
}
