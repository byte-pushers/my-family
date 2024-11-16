package com.bytepushers.family.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("GROUP")
public class GroupPackage extends Package{

    public GroupPackage() {}

    public GroupPackage(String name, Double basePrice) {
        super(name, basePrice);
    }

    @Override
    public Double calculateTotalPrice(int numPeople) {
        return getBasePrice() * numPeople;
    }
}
