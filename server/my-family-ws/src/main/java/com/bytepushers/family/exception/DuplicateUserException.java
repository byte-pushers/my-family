package com.bytepushers.family.exception;

/**
 * Exception thrown when an attempt is made to create a user that already exists.
 * <p>
 * This exception is typically used to indicate that a user with the same unique identifier,
 * such as an email address, already exists in the system.
 * </p>
 *
 * @author Danny Amezquita
 * @version 1.0
 */
public class DuplicateUserException extends RuntimeException {

    /**
     * Constructs a new {@code DuplicateUserException} with the specified detail message.
     *
     * @param message The detail message explaining the reason for the exception.
     */
    public DuplicateUserException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code DuplicateUserException} with the specified detail message and cause.
     *
     * @param message The detail message explaining the reason for the exception.
     * @param cause   The cause of the exception (a throwable that caused this exception to be thrown).
     */
    public DuplicateUserException(String message, Throwable cause) {
        super(message, cause);
    }
}
