package com.bytepushers.family.ApiResponse;

public class ApiResponse<T> {
    private T status;
    private T message;
    private T data;

    public ApiResponse() {
    }

    public ApiResponse(T data, T message, T status) {
        this.data = data;
        this.message = message;
        this.status = status;
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

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
