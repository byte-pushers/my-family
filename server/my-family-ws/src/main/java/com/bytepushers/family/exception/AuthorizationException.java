package com.bytepushers.family.exception;

/**
 * Exception thrown when an Authorization error occurs.
 * <p>
 * This exception is typically used to indicate that the application was unable to authorize a given User.
 * </p>
 *
 * @author Danny Amezquita
 * @version 1.0
 */
public class AuthorizationException extends RuntimeException {
    /**
     * Constructs a new {@code AuthorizationException} with the specified detail message.
     *
     * @param message The detail message explaining the reason for the exception.
     */
    public AuthorizationException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code AuthorizationException} with the specified detail message and cause.
     *
     * @param message The detail message explaining the reason for the exception.
     * @param cause   The cause of the exception (a throwable that caused this exception to be thrown).
     */
    public AuthorizationException(String message, Throwable cause) {
        super(message, cause);
    }
}
