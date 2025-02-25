package com.bytepushers.family.api;

public class LoginRequestPayload {
    private String transactionId;
    private LoginCredentials credentials;

    public LoginRequestPayload() {

    }

    public LoginRequestPayload(String transactionId, LoginCredentials credentials) {
        this.transactionId = transactionId;
        this.credentials = credentials;
    }

    public String getTransactionId() {
        return this.transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public LoginCredentials getCredentials() {
        return this.credentials;
    }

    public void setCredentials(LoginCredentials credentials) {
        this.credentials = credentials;
    }
}
