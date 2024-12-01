package com.bytepushers.family.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

public class FreePackage extends Package {

    public FreePackage() {
        super("package","free package","free package",0);
    }

    @Override
    public double calculateTotalCost(int attendees){
        return 0.0;
    };
}
