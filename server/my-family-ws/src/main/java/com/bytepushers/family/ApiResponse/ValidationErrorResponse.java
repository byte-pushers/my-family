<<<<<<<< HEAD:server/my-family-ws/src/main/java/com/bytepushers/family/ApiResponse/ValidationErrorResponse.java
package com.bytepushers.family.ApiResponse;
========
package com.bytepushers.family.model;
>>>>>>>> feature/login-api-service:server/my-family-ws/src/main/java/com/bytepushers/family/model/ValidationErrorResponse.java

import java.util.List;

public class ValidationErrorResponse {
    private int status;
    private String message;
    private List<String> errors;

    public ValidationErrorResponse(int status, String message, List<String> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
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

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

}
