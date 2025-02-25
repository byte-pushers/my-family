package com.bytepushers.family.exception;

/**
 * Exception thrown when a database operation fails.
 * <p>
 * This exception is typically used to indicate an error during a database query
 * or transaction that cannot be handled gracefully.
 * </p>
 *
 * @author Danny Amezquita
 * @version 1.0
 */
public class DatabaseOperationException extends RuntimeException {

    /**
     * Constructs a new {@code DatabaseOperationException} with the specified detail message and cause.
     *
     * @param message The detail message explaining the reason for the exception.
     * @param cause   The cause of the exception (a throwable that caused this exception to be thrown).
     */
    public DatabaseOperationException(String message, Throwable cause) {
        super(message, cause);
    }
}
