package com.bytepushers.family.model;

public interface Item {

    String getType();

    String getName();

    String getDescription();

    double getPrice();

    void setType(String type);

    void setName(String name);

    void setDescription(String description);

    void setPrice(double price);


   public abstract double calculateTotalCost(int attendees);
}
