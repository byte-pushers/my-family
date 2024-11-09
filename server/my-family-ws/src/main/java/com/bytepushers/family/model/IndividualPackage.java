package com.bytepushers.family.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("INDIVIDUAL")
public class IndividualPackage extends Package {

    public IndividualPackage() {}

    public IndividualPackage(String name, Double basePrice) {
        super(name, basePrice);
    }

    @Override
    public Double calculateTotalPrice(int numPeople) {
        return getBasePrice() * numPeople;
    }
}
