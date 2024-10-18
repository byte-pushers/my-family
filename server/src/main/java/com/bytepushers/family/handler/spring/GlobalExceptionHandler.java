package com.bytepushers.family.handler.spring;

import com.bytepushers.family.exception.AuthorizationException;
import com.bytepushers.family.exception.DatabaseConnectionException;
import com.bytepushers.family.exception.DatabaseOperationException;
import com.bytepushers.family.exception.DuplicateUserException;
import com.bytepushers.family.exception.InvalidUserException;
import com.bytepushers.family.exception.UserDeletionFailedException;
import com.bytepushers.family.exception.UserNotFoundException;
import com.bytepushers.family.model.ErrorDetail;
import com.bytepushers.family.api.APIErrorConstant;
import com.bytepushers.family.api.ErrorResponse;
import com.bytepushers.family.api.ValidationErrorResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<ErrorResponse> handleAuthorizationException(AuthorizationException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                "403",
                "Unauthorized Access",
                new ErrorDetail(
                        "AUTHORIZATION_ERROR",
                        ex.getMessage()
                )
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

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
                    new ErrorDetail(
                            APIErrorConstant.API_ERROR_INVALID_INPUT,
                            ex.getMessage()
                    )


            );
            errors.add(validationResponse);
        });

        //ErrorResponse errorResponse = new ErrorResponse(errors);

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUsernameNotFoundException(UsernameNotFoundException ex){
        ErrorResponse errorResponse = new ErrorResponse(
                "404",
                "User Not Found",
                new ErrorDetail(
                        "USER_NOT_FOUND",
                        ex.getMessage()
                )
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<Object> handleDuplicateUserException(DuplicateUserException ex){
        ErrorResponse errorResponse = new ErrorResponse(
                "400",
                "Duplicate User",
                new ErrorDetail(
                        "USER_DUPLICATE",
                        ex.getMessage()
                )
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidUserException.class)
    public ResponseEntity<Object> handleInvalidUserException(InvalidUserException ex){
        ErrorResponse errorResponse = new ErrorResponse(
                "400",
                "Invalid User Data",
                new ErrorDetail(
                        "INVALID_USER_DATA",
                        ex.getMessage()
                )
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserDeletionFailedException.class)
    public ResponseEntity<Object> handleUserDeletionFailedException(Exception ex){
        ErrorResponse errorResponse = new ErrorResponse(
                "500",
                "User Deletion Failed",
                new ErrorDetail(
                        "USER_DELETION_ERROR",
                        ex.getMessage()
                )
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
