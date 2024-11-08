package com.bytepushers.family.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("FAMILY")
public class FamilyPackage extends Package {

    public FamilyPackage() {}

    public FamilyPackage(String name, Double basePrice) {
        super(name, basePrice);
    }

    @Override
    public Double calculateTotalPrice(int numPeople) {
        return getBasePrice()*numPeople;
    }
}
