package com.bytepushers.family.GlobalErrorHandler;

public class UserDeletionFailedException extends RuntimeException {
    public UserDeletionFailedException(String message) {
        super(message);
    }

    public UserDeletionFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
