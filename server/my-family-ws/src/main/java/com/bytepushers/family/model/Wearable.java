package com.bytepushers.family.model;

import jakarta.persistence.*;


@Entity
public class Wearable extends Merchandise{

    private String SKU;
    private String size;
    private String color;

    public Wearable(String type, String name, String description, double price, int quantity) {
        super(type, name, description, price, quantity);
    }

    public Wearable(String type, String name, String description, double price, int quantity, String SKU, String size, String color) {
        super(type, name, description, price, quantity);
        this.SKU = SKU;
        this.size = size;
        this.color = color;
    }

    public Wearable() {

    }

    public String getSKU() {
        return SKU;
    }

    public void setSKU(String SKU) {
        this.SKU = SKU;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

}