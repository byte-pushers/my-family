package com.bytepushers.family.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("INDIVIDUAL")
public class IndividualPackage extends Package {

    public IndividualPackage() {
        super("individual", 100);
    }

    @Override
    public double calculatePackageCost(double baseCost, int numberOfPeople) {
        return baseCost;
    }

}
