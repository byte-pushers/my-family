package com.bytepushers.family.GlobalErrorHandler;

import com.bytepushers.family.ApiResponse.APIErrorConstant;
import com.bytepushers.family.ApiResponse.ErrorResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<Object> handleException(DuplicateKeyException ex) {

        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_ALREADY_EXIST,
                "USER ALREADY EXISTS",
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }


    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<List<ErrorResponse>> handleConstrainViolationException(ConstraintViolationException ex) {

        List<ErrorResponse> errors = new ArrayList<>();
        ex.getConstraintViolations().forEach(fieldError -> {
            ErrorResponse validationResponse = new ErrorResponse(
                    "400",
                    fieldError.getMessage(),
                    APIErrorConstant.API_ERROR_INVALID_INPUT

            );
            errors.add(validationResponse);
        });

        //ErrorResponse errorResponse = new ErrorResponse(errors);

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

}
