package com.bytepushers.family.model;


import java.util.List;

public class ErrorDetail {
    private List<String> fieldName;


    // Constructor
    public ErrorDetail(List<String> fieldName) {
        this.fieldName = fieldName;
    }

    // Getters and Setters

    public List<String> getFieldName() {
        return fieldName;
    }

    public void setFieldName(List<String> fieldName) {
        this.fieldName = fieldName;
    }
}