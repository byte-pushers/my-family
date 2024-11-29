package com.bytepushers.family.model;


public abstract class Package extends ShoppingItem{

    private int attendees;

    public Package() {
    }

    public Package(String type, String name, String description, double price) {
        super(type, name, description, price);
    }

    public Package(String type, String name, String description, double price, int quantity, int attendees) {
        super(type, name, description, price);
        this.attendees = attendees;
    }

    public int getAttendees() {
        return attendees;
    }

    public void setAttendees(int attendees) {
        this.attendees = attendees;
    }

//    public static double calculatePackageCost(int attendees, double price) {
//        return  attendees * price;
//    };

    @Override
    public abstract double calculateTotalCost(int attendees);
}
