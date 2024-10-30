package com.bytepushers.family.api;

public class ApiResponse <T> {


    //private Object data;
    private T data;
    public ApiResponse() {
    }

    public ApiResponse(T data) {
        this.data = data;
    }
    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
