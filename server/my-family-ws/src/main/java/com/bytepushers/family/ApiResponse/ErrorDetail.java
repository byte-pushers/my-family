package com.bytepushers.family.ApiResponse;

public class ErrorDetail {
    private String code;
    private String details;

    // Constructor
    public ErrorDetail(String code, String details) {
        this.code = code;
        this.details = details;
    }

    // Getters and Setters
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
