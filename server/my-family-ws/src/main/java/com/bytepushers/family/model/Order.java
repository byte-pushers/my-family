package com.bytepushers.family.model;

import java.util.ArrayList;

public class Order {
    List<Item> items = new ArrayList<>();
    // Item interface which has String type, double price, int quantity, sku and
    // public OrderPrice calculatePrice() method which calculate price based on state, city taxes

    // class abstract BaseItem implements Item

    // ShoppingItem implements BaseItem.

    // Merchandise extends ShoppingItem
    // Merchandise has these attributes: name, type

    // FamilyReunionPackage extends ShoppingItem
    // FamilyReunionPackage has these attributes: int attendees

    // Book extends ShoppingItem
    // Book has these attributes: string isbn

    // Wearable extends ShoppingItem
    // Wearable has these attributes: string size, color



    public OrderPrice calculatePrice() {
        // loop through all the items
        //      -- call calculatePrice() on each item and aggregate the OrderPrice
    }
}
