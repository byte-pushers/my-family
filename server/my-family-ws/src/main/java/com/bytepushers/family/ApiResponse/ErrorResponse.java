<<<<<<<< HEAD:server/my-family-ws/src/main/java/com/bytepushers/family/ApiResponse/ErrorResponse.java
package com.bytepushers.family.ApiResponse;
========
package com.bytepushers.family.model;
>>>>>>>> feature/login-api-service:server/my-family-ws/src/main/java/com/bytepushers/family/model/ErrorResponse.java

public class ErrorResponse {
    private int status;
    private String message;
    private ErrorDetail error;

    public ErrorResponse() {
    }

    public ErrorResponse(int status, String message, ErrorDetail error) {
        this.status = status;
        this.message = message;
        this.error = error;
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

    public ErrorDetail getError() {
        return error;
    }

    public void setError(ErrorDetail error) {
        this.error = error;
    }
}
