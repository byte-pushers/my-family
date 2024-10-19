package com.bytepushers.family.api;

import com.bytepushers.family.model.FamilyTree;

public class ApiResponse {
    private int status;
    private String message;
    private Object data;

    public ApiResponse(int data, String familyTreeWasCreatedSuccessfully, FamilyTree familyTree) {
    }

    public ApiResponse(Object data, String message, int status) {
        this.data = data;
        this.message = message;
        this.status = status;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}