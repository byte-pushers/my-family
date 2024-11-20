package com.bytepushers.family.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("GROUP")
public class GroupPackage extends Package{

    private static final double extra_cost_per_persion = 30.0;

    public GroupPackage() {
        super("group", 100);
    }

    public GroupPackage(String name, Double basePrice) {
        super(name, basePrice);
    }

    @Override
    public double calculatePackageCost(double baseCost, int numberOfPeople) {
        double additionalCost = (numberOfPeople > 3) ? extra_cost_per_persion * (numberOfPeople-3) : 0;
        return getBasePrice() + additionalCost;
    }
}
