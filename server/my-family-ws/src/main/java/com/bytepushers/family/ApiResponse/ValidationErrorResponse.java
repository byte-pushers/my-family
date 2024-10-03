package com.bytepushers.family.ApiResponse;

import java.util.List;

public class ValidationErrorResponse<T> {
    private T status;
    private T message;
    private List<String> errors;

    public ValidationErrorResponse(T status, T message, List<String> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
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

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

}
