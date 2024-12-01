package com.bytepushers.family.model;


public class IndividualPackage extends Package {

    public IndividualPackage() {
        super("Package","individual package","individual package",150);
    }

    @Override
    public double calculateTotalCost(int attendees){
        return this.getPrice()*1;
    };
}
