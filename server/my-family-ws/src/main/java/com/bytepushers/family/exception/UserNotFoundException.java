package com.bytepushers.family.exception;

/**
 * Exception thrown when a user is not found in the system.
 * <p>
 * This exception is used to indicate that the requested user data
 * does not exist or cannot be retrieved.
 * </p>
 *
 * @author Danny Amezquita
 * @version 1.0
 */
public class UserNotFoundException extends RuntimeException {

    /**
     * Constructs a new {@code UserNotFoundException} with the specified detail message.
     *
     * @param message The detail message explaining the reason for the exception.
     */
    public UserNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code UserNotFoundException} with the specified detail message and cause.
     *
     * @param message The detail message explaining the reason for the exception.
     * @param cause   The cause of the exception (a throwable that caused this exception to be thrown).
     */
    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
