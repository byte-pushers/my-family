package com.bytepushers.family.model;
import jakarta.persistence.*;


@MappedSuperclass
public abstract class ShoppingItem extends BaseItem {

    private int quantity;

    public ShoppingItem() {}

    public ShoppingItem(String type, String name, String description, double price) {
        super(type, name, description, price);
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

//    @Override
//    public abstract double calculateTotalCost(int quantity, int attendees, double price);

}
