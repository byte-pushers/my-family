package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Wearable.class, name = "wearable"),
        @JsonSubTypes.Type(value = Book.class, name = "book")
})
public class Merchandise extends ShoppingItem {

    private String imageUrl;

    public Merchandise(String type, String name, String description, double price, int quantity) {
        super(type, name, description, price);
    }

    public Merchandise(String type, String name, String description, double price, String imageUrl) {
        super(type, name, description, price);
        this.imageUrl = imageUrl;
    }

    public Merchandise() {

    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public static double calculateTotalCost(Package packages){
        return packages.getPrice() * packages.getQuantity();
    };

    @Override
    public double calculateTotalCost(int attendees) {
        return 0;
    }


}
