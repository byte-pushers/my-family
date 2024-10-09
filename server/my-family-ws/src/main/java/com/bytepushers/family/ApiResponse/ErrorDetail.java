package com.bytepushers.family.ApiResponse;

public class ErrorDetail {
    private int code;
    private Object details;

    // Constructor
    public ErrorDetail(int code, Object details) {
        this.code = code;
        this.details = details;
    }

    // Getters and Setters
    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getDetails() {
        return details;
    }

    public void setDetails(Object details) {
        this.details = details;
    }
}
