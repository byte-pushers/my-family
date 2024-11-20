package com.bytepushers.family.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("FREE")
public class FreePackage extends Package {

    public FreePackage() {
        super("free", 0.0);
    }

    public FreePackage(String name) {
        super(name, 0.0);
    }

    @Override
    public double calculatePackageCost(double baseCost, int numberOfPeople) {
        return baseCost;
    }
}
