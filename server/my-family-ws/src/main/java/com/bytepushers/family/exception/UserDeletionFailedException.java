package com.bytepushers.family.exception;

/**
 * Exception thrown when the deletion of a user fails.
 * <p>
 * This exception is used to indicate that an attempt to delete a user from the system
 * was unsuccessful due to either a database error or some other issue.
 * </p>
 *
 * @author Danny Amezquita
 * @version 1.0
 */
public class UserDeletionFailedException extends RuntimeException {

    /**
     * Constructs a new {@code UserDeletionFailedException} with the specified detail message.
     *
     * @param message The detail message explaining the reason for the exception.
     */
    public UserDeletionFailedException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code UserDeletionFailedException} with the specified detail message and cause.
     *
     * @param message The detail message explaining the reason for the exception.
     * @param cause   The cause of the exception (a throwable that caused this exception to be thrown).
     */
    public UserDeletionFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
