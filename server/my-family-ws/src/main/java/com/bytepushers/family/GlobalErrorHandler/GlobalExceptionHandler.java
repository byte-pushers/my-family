package com.bytepushers.family.GlobalErrorHandler;

import com.bytepushers.family.logs.ErrorDetail;
import com.bytepushers.family.logs.ErrorResponse;
import com.bytepushers.family.logs.ValidationErrorResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<Object> handleException(DuplicateKeyException ex) {

        ErrorResponse errorResponse = new ErrorResponse(
                400,
                "User Already Exist",
                new ErrorDetail(
                        "EMAIL_EXIST",
                        "Email is already registered"
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
}
