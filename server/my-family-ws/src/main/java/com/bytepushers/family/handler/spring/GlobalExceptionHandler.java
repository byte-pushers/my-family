package com.bytepushers.family.handler.spring;

import com.bytepushers.family.exception.*;
import com.bytepushers.family.model.ErrorDetail;
import com.bytepushers.family.api.APIErrorConstant;
import com.bytepushers.family.api.ErrorResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    private final HttpMessageConverters messageConverters;

    public GlobalExceptionHandler(HttpMessageConverters messageConverters) {
        this.messageConverters = messageConverters;
    }

    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<ErrorResponse> handleAuthorizationException(AuthorizationException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_UNAUTHORIZED_ACCESS,
                "Unauthorized Access",
                null,
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateKeyException(DuplicateKeyException ex) {

        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_ALREADY_EXIST,
                "USER ALREADY EXISTS",
                null,
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<List<ErrorResponse>> handleValidationExceptions(ConstraintViolationException ex) {
        List<ErrorResponse> errorResponses = new ArrayList<>();

        List<String> requiredFields = new ArrayList<>();
        List<String> minFields = new ArrayList<>();
        List<String> maxFields = new ArrayList<>();
        List<String> lengthFields = new ArrayList<>();
        List<String> formatFields = new ArrayList<>();


        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
          String fieldName = violation.getPropertyPath().toString();
          String messageTemplate = violation.getMessageTemplate();
          String errorCode = violation.getConstraintDescriptor().getAnnotation().annotationType().getSimpleName();

            System.out.println(errorCode + " " + fieldName + " " + messageTemplate);

            // Check error types based on error codes
            switch (errorCode) {
                case "NotNull":
                case "NotBlank":
                    requiredFields.add(fieldName);
                    break;
                case "Min":
                    minFields.add(fieldName);
                    break;
                case "Max":
                    maxFields.add(fieldName);
                    break;
                case "Size":
                    lengthFields.add(fieldName);
                    break;
                case "Email":
                    formatFields.add(fieldName);
                    break;
            }
        }

        // Create ErrorResponses if there are any errors in each category
        if (!requiredFields.isEmpty()) {
            errorResponses.add(new ErrorResponse(APIErrorConstant.API_ERROR_REQUIRED_FIELD_INVALID_INPUT, "Required field must be filled", null, new ErrorDetail(requiredFields)));
        }
        if (!minFields.isEmpty()) {
            errorResponses.add(new ErrorResponse(APIErrorConstant.API_ERROR_MIN_VALUE_INPUT, "Field does not accept below minimum value", null, new ErrorDetail(minFields)));
        }
        if (!maxFields.isEmpty()) {
            errorResponses.add(new ErrorResponse(APIErrorConstant.API_ERROR_MAX_VALUE_INPUT, "Field does not accept above maximum value", null, new ErrorDetail(maxFields)));
        }
        if (!lengthFields.isEmpty()) {
            errorResponses.add(new ErrorResponse(APIErrorConstant.API_ERROR_MIN_LENGTH_INPUT, "Does not meet the minimum length requirement", null, new ErrorDetail(lengthFields)));
        }
        if (!formatFields.isEmpty()) {
            errorResponses.add(new ErrorResponse(APIErrorConstant.API_ERROR_INVALID_EMAIL_FORMAT, "Does not follow required email format", null, new ErrorDetail(formatFields)));
        }

        return new ResponseEntity<>(errorResponses, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUsernameNotFoundException(UsernameNotFoundException ex){
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_NOT_FOUND,
                "User Not Found",
                null,
                null

        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<Object> handleDuplicateUserException(DuplicateUserException ex){
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_ALREADY_EXIST,
                "Duplicate User",
                null,
                null

        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidUserException.class)
    public ResponseEntity<Object> handleInvalidUserException(InvalidUserException ex){
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_NOT_FOUND,
                "Invalid User Data",
                null,
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserDeletionFailedException.class)
    public ResponseEntity<Object> handleUserDeletionFailedException(Exception ex){
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_DELETION_FAILED,
                "User Deletion Failed",
                null,
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(NotFoundException ex){
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_SOURCE_NOT_FOUND,
                ex.getMessage(),
                null,
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
}
