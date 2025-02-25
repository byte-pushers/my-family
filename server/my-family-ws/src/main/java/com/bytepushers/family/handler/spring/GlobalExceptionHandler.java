package com.bytepushers.family.handler.spring;

import com.bytepushers.family.exception.*;
import com.bytepushers.family.model.ErrorDetail;
import com.bytepushers.family.api.APIErrorConstant;
import com.bytepushers.family.api.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
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

/**
 * The {@code GlobalExceptionHandler} class handles various types of exceptions that may occur during
 * the execution of the application. It provides centralized exception handling for different error
 * scenarios such as invalid inputs, authorization issues, and resource not found.
 *
 * <p>This class uses the {@code @ControllerAdvice} annotation to handle exceptions globally across
 * all controllers in the Spring application. It provides specific error responses for common exceptions
 * like {@code IllegalArgumentException}, {@code DuplicateKeyException}, and custom exceptions such as
 * {@code UserNotFoundException}.</p>
 *
 * <p>The error responses are structured in the {@code ErrorResponse} format, with detailed error codes and
 * messages tailored to the specific exception.</p>
 *
 * @author Adish Timalsina
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private final HttpMessageConverters messageConverters;

    /**
     * Constructor for the GlobalExceptionHandler.
     *
     * @param messageConverters provides HTTP message converters for the handler.
     */
    public GlobalExceptionHandler(HttpMessageConverters messageConverters) {
        this.messageConverters = messageConverters;
    }

    /**
     * Handles {@link IllegalArgumentException} by returning a BAD_REQUEST response with a specific error message.
     *
     * @param ex      the exception thrown
     * @param request the HTTP request that caused the exception
     * @return a {@link ResponseEntity} containing an {@link ErrorResponse} with details of the error
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handlerIllegalArgumentException(IllegalArgumentException ex, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_ILLEGAL_ARGUMENT,
                ex.getMessage(),
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles {@link AuthorizationException} by returning an UNAUTHORIZED response with an error message.
     *
     * @param ex the exception thrown
     * @return a {@link ResponseEntity} containing an {@link ErrorResponse} with details of the error
     */
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

    /**
     * Handles {@link DuplicateKeyException} by returning a CONFLICT response with an error message indicating
     * that the user already exists.
     *
     * @param ex the exception thrown
     * @return a {@link ResponseEntity} containing an {@link ErrorResponse} with details of the error
     */
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

    /**
     * Handles {@link ConstraintViolationException} by returning a BAD_REQUEST response with a detailed list of
     * validation errors.
     *
     * @param ex the exception thrown
     * @return a {@link ResponseEntity} containing a list of {@link ErrorResponse}s with details of the validation errors
     */
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

    /**
     * Handles {@link UserNotFoundException} by returning a NOT_FOUND response indicating that the user could
     * not be found.
     *
     * @param ex the exception thrown
     * @return a {@link ResponseEntity} containing an {@link ErrorResponse} with details of the error
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_NOT_FOUND,
                "User Not Found",
                null,
                null

        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles {@link DuplicateUserException} by returning a BAD_REQUEST response indicating that the user
     * already exists.
     *
     * @param ex the exception thrown
     * @return a {@link ResponseEntity} containing an {@link ErrorResponse} with details of the error
     */
    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<Object> handleDuplicateUserException(DuplicateUserException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_ALREADY_EXIST,
                "Duplicate User",
                null,
                null

        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles {@link InvalidUserException} by returning a BAD_REQUEST response indicating that the user data
     * is invalid.
     *
     * @param ex the exception thrown
     * @return a {@link ResponseEntity} containing an {@link ErrorResponse} with details of the error
     */
    @ExceptionHandler(InvalidUserException.class)
    public ResponseEntity<Object> handleInvalidUserException(InvalidUserException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_NOT_FOUND,
                "Invalid User Data",
                null,
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles {@link UserDeletionFailedException} by returning an INTERNAL_SERVER_ERROR response indicating
     * that user deletion failed.
     *
     * @param ex the exception thrown
     * @return a {@link ResponseEntity} containing an {@link ErrorResponse} with details of the error
     */
    @ExceptionHandler(UserDeletionFailedException.class)
    public ResponseEntity<Object> handleUserDeletionFailedException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_USER_DELETION_FAILED,
                "User Deletion Failed",
                null,
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Handles {@link NotFoundException} by returning a NOT_FOUND response with a message from the exception.
     *
     * @param ex the exception thrown
     * @return a {@link ResponseEntity} containing an {@link ErrorResponse} with details of the error
     */
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(NotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                APIErrorConstant.API_ERROR_SOURCE_NOT_FOUND,
                ex.getMessage(),
                null,
                null
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
}
