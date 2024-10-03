package com.bytepushers.family.ApiResponse;

public class ErrorDetail<T> {
    private T code;
    private T details;

    // Constructor
    public ErrorDetail(T code, T details) {
        this.code = code;
        this.details = details;
    }

    // Getters and Setters
    public T getCode() {
        return code;
    }

    public void setCode(T code) {
        this.code = code;
    }

    public T getDetails() {
        return details;
    }

    public void setDetails(T details) {
        this.details = details;
    }
}
