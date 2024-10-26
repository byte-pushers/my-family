package com.bytepushers.family.exception;

public class WeakPasswordException extends RuntimeException {
    public WeakPasswordException() {
        super("Password must be at least 8 characters long.");
    }

    public WeakPasswordException(String message) {
        super(message);
    }
}
