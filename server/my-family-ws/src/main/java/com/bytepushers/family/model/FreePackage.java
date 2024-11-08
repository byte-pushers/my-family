package com.bytepushers.family.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("FREE")
public class FreePackage extends Package {

    public FreePackage() {}

    public FreePackage(String name) {
        super(name, 0.0);
    }

    @Override
    public Double calculateTotalPrice(int numPeople) {
        return 0.0;  // No charge for the free package
    }
}
