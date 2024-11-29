package com.bytepushers.family.model;


public class GroupPackage extends Package{

    public GroupPackage() {
        super("package","Group Package", "Group Package",200);
    }

    @Override
    public double calculateTotalCost(int attendees){
        return this.getPrice()*attendees;
    };
}
