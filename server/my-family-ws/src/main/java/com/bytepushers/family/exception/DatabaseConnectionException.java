package com.bytepushers.family.exception;

/**
 * Exception thrown when a database connection error occurs.
 * <p>
 * This exception is typically used to indicate that the application was unable to establish
 * a connection to the database, either due to network issues, incorrect configuration, or other failures.
 * </p>
 *
 * @author Danny Amezquita
 * @version 1.0
 */
public class DatabaseConnectionException extends RuntimeException {

    /**
     * Constructs a new {@code DatabaseConnectionException} with the specified detail message.
     *
     * @param message The detail message explaining the reason for the exception.
     */
    public DatabaseConnectionException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code DatabaseConnectionException} with the specified detail message and cause.
     *
     * @param message The detail message explaining the reason for the exception.
     * @param cause   The cause of the exception (a throwable that caused this exception to be thrown).
     */
    public DatabaseConnectionException(String message, Throwable cause) {
        super(message, cause);
    }
}
