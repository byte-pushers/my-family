package com.bytepushers.family.model;

import jakarta.persistence.*;


@Entity
public class Wearable extends Merchandise{

    private String SKU;
    private String size;
    private String color;

    /**
     * Constructor with basic attributes for a wearable.
     *
     * @param type        the type of the wearable (e.g., T-shirt, Shoes).
     * @param name        the name of the wearable item.
     * @param description a description of the wearable item.
     * @param price       the price of the wearable.
     * @param quantity    the quantity available.
     */
    public Wearable(String type, String name, String description, double price, int quantity) {
        super(type, name, description, price, quantity);
    }

    /**
     * Constructor with additional attributes specific to the wearable.
     *
     * @param type        the type of the wearable.
     * @param name        the name of the wearable.
     * @param description a description of the wearable.
     * @param price       the price of the wearable.
     * @param quantity    the quantity of the wearable.
     * @param SKU         the SKU (Stock Keeping Unit) of the wearable.
     * @param size        the size of the wearable.
     * @param color       the color of the wearable.
     */
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