package com.bytepushers.family.api;

import com.bytepushers.family.model.ErrorDetail;
import com.bytepushers.family.model.ErrorResponse;
import com.bytepushers.family.model.ValidationErrorResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidEmailException.class)
    public ResponseEntity<Object> handleInvalidEmailException(InvalidEmailException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                400,
                "Invalid Email",
                new ErrorDetail(
                        "INVALID_EMAIL",
                        ex.getMessage()
                )
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<Object> handleNullException(NullPointerException ex) {

        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstrainViolationException(ConstraintViolationException ex) {

        ArrayList<String> errors = new ArrayList<>();
        ex.getConstraintViolations().forEach(fieldError -> {
            errors.add(fieldError.getMessage());
        });

        ValidationErrorResponse validationResponse = new ValidationErrorResponse(
                400,
                "Invalid Request",
                errors
        );
        return new ResponseEntity<>(validationResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex) {
        // Handling invalid credentials or other issues.
        ErrorResponse errorResponse = new ErrorResponse(
                401,
                "Unauthorized",
                new ErrorDetail(
                        "INVALID_CREDENTIALS",
                        ex.getMessage()
                )
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
    // Handle unsupported request method (405 Method Not Allowed)
    @ExceptionHandler(org.springframework.web.HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Object> handleMethodNotAllowedException(HttpRequestMethodNotSupportedException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                405,
                "Method Not Allowed",
                new ErrorDetail(
                        "METHOD_NOT_ALLOWED",
                        "The request method is not supported for this endpoint"
                )
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.METHOD_NOT_ALLOWED);
    }

    // Handle unimplemented methods (501 Not Implemented)
    @ExceptionHandler(org.springframework.web.HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Object> handleNotImplementedException(HttpMediaTypeNotSupportedException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                501,
                "Not Implemented",
                new ErrorDetail(
                        "NOT_IMPLEMENTED",
                        "The server either does not recognize the request method, or it lacks the ability to fulfill the request"
                )
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_IMPLEMENTED);
    }
}
