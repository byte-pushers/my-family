package com.bytepushers.family.api;

import com.bytepushers.family.model.Person;
import jakarta.validation.constraints.NotNull;

public class PersonRequestPayload {
    @NotNull
    private String transactionId;

    @NotNull
    private Person person;

    public PersonRequestPayload() {

    };

    public @NotNull String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(@NotNull String transactionId) {
        this.transactionId = transactionId;
    }

    public @NotNull Person getPerson() {
        return person;
    }

    public void setPerson(@NotNull Person person) {
        this.person = person;
    }
}
