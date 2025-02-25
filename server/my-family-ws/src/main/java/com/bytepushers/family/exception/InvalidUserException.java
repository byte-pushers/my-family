package com.bytepushers.family.exception;

/**
 * Exception thrown when an invalid user operation is attempted.
 * <p>
 * This exception is used to indicate that user data provided is invalid, incomplete,
 * or violates business rules during processing.
 * </p>
 *
 * @author Danny Amezquita
 * @version 1.0
 */
public class InvalidUserException extends RuntimeException {

    /**
     * Constructs a new {@code InvalidUserException} with the specified detail message.
     *
     * @param message The detail message explaining the reason for the exception.
     */
    public InvalidUserException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code InvalidUserException} with the specified detail message and cause.
     *
     * @param message The detail message explaining the reason for the exception.
     * @param cause   The cause of the exception (a throwable that caused this exception to be thrown).
     */
    public InvalidUserException(String message, Throwable cause) {
        super(message, cause);
    }
}
