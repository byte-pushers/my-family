package com.bytepushers.family.model;


public class FamilyPackage extends Package {

    public FamilyPackage() {
       super("Package","family package", "family package",100);
    }

    @Override
    public double calculateTotalCost(int attendees) {
        return this.getPrice() * attendees;
    }

}
