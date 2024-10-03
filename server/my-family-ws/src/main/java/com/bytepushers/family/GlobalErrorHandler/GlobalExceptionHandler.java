package com.bytepushers.family.GlobalErrorHandler;

import com.bytepushers.family.ApiResponse.ErrorDetail;
import com.bytepushers.family.ApiResponse.ErrorResponse;
import com.bytepushers.family.ApiResponse.ValidationErrorResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.ArrayList;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<Object> handleException(DuplicateKeyException ex) {

        ErrorResponse errorResponse = new ErrorResponse(
                409,
                "User Already Exist",
                new ErrorDetail(
                        "EMAIL_EXIST",
                        "Email is already registered"
                )
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
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
