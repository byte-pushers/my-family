package com.bytepushers.family.exception;

/**
 * Exception thrown when a requested resource is not found.
 * <p>
 * This exception is used to indicate that the requested data or resource
 * does not exist in the system.
 * </p>
 *
 * @author Danny Amezquita
 * @version 1.0
 */
public class NotFoundException extends RuntimeException {

    /**
     * Constructs a new {@code NotFoundException} with the specified detail message.
     *
     * @param message The detail message explaining the reason for the exception.
     */
    public NotFoundException(String message) {
        super(message);
    }
}
