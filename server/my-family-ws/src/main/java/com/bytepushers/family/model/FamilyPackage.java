package com.bytepushers.family.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("FAMILY")
public class FamilyPackage extends Package {

    private static final double extra_cost_per_persion = 20.0;

    public FamilyPackage() {
        super("family", 100);
    }

    public FamilyPackage(String name, Double basePrice) {
        super(name, basePrice);
    }

    @Override
    public double calculatePackageCost(double baseCost, int numberOfPeople) {
        double additionalCost = (numberOfPeople>3) ? extra_cost_per_persion * (numberOfPeople -3) : 0;
        return getBasePrice()+ additionalCost;
    }
}
