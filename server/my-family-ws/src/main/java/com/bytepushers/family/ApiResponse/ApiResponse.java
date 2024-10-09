package com.bytepushers.family.ApiResponse;

public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;

    public ApiResponse() {
    }

    public ApiResponse(T data, String message, int code) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int status) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
