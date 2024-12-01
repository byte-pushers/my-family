package com.bytepushers.family.model;

import jakarta.persistence.*;


@Entity
@Table(name = "orders")
public class Order extends Package{

    public Order() {

    }

    public Order(String type, String name, String description, double price) {
        super(type, name, description, price);
    }

    @Override
    public double calculateTotalCost(int attendees){
       return 0.0;
    };
}
