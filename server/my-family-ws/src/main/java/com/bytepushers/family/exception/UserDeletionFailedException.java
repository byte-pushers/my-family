package com.bytepushers.family.exception;

public class UserDeletionFailedException extends RuntimeException {
    public UserDeletionFailedException(String message) {
        super(message);
    }

    public UserDeletionFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
