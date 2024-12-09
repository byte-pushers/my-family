package com.bytepushers.family.exception;

/**
 * Exception thrown when a provided password does not meet the required security standards.
 * <p>
 * This exception is typically used to enforce password strength policies, such as
 * minimum length or complexity requirements.
 * </p>
 *
 * <p>
 * Default behavior: Throws a message indicating that the password must be at least 8 characters long.
 * </p>
 *
 * @author Danny Amezquita
 * @version 1.0
 */
public class WeakPasswordException extends RuntimeException {

    /**
     * Constructs a new {@code WeakPasswordException} with the default detail message.
     */
    public WeakPasswordException() {
        super("Password must be at least 8 characters long.");
    }

    /**
     * Constructs a new {@code WeakPasswordException} with the specified detail message.
     *
     * @param message The detail message explaining the reason for the exception.
     */
    public WeakPasswordException(String message) {
        super(message);
    }
}
