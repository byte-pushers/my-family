package com.bytepushers.family.model;

import jakarta.persistence.*;

@MappedSuperclass
public abstract class BaseItem implements Item{
    @Id
    @GeneratedValue
    private Long id;
    private  String type;
    private String name;
    private String description;
    private double price;

    public BaseItem() {

    }

    public BaseItem(String type, String name, String description, double price) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    @Override
    public String getType() {
        return type;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public double getPrice() {
        return price;
    }

    @Override
    public String getDescription() {
        return description;
    }


    @Override
    public void setType(String type) {
        this.type = type;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public void setPrice(double price) {
        this.price = price;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

//    @Override
//    public abstract double calculateTotalCost(int quantity, int attendees, double price);
}
