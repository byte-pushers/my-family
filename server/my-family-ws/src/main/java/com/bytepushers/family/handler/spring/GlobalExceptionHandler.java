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
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<ErrorResponse> handleAuthorizationException(AuthorizationException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_UNAUTHORIZED_ACCESS,
                "Unauthorized Access",
                null

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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        // Collect all field errors from the exception
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        // Respond with a map containing all field errors
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<List<ErrorResponse>> handleConstrainViolationException(ConstraintViolationException ex) {

        List<ErrorResponse> errors = new ArrayList<>();
        ex.getConstraintViolations().forEach(fieldError -> {
            ErrorResponse validationResponse = new ErrorResponse(
                    APIErrorConstant.API_ERROR_INVALID_INPUT,
                    fieldError.getMessage(),
                    null
            );
            errors.add(validationResponse);
        });

        //ErrorResponse errorResponse = new ErrorResponse(errors);

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUsernameNotFoundException(UsernameNotFoundException ex){
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_NOT_FOUND,
                "User Not Found",
                null

        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<Object> handleDuplicateUserException(DuplicateUserException ex){
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_ALREADY_EXIST,
                "Duplicate User",
                null

        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidUserException.class)
    public ResponseEntity<Object> handleInvalidUserException(InvalidUserException ex){
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_NOT_FOUND,
                "Invalid User Data",
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserDeletionFailedException.class)
    public ResponseEntity<Object> handleUserDeletionFailedException(Exception ex){
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_DELETION_FAILED,
                "User Deletion Failed",
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
