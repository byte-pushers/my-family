package com.bytepushers.family.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;

import java.util.Objects;

@Entity
@PrimaryKeyJoinColumn(name = "wearable_id")
public class Wearable extends Merchandise{

    private WearableType wearableType;
    private String SKU;
    private String size;
    private String color;

    public Wearable() {
        super();
    }

    public Wearable(Long id, MerchandiseType merchandiseType, String productName, float productPrice, String productDescription, String productImageUrl, WearableType wearableType, String SKU, String size, String color) {
        super(id, merchandiseType, productName, productPrice, productDescription, productImageUrl);
        this.wearableType = wearableType;
        this.SKU = SKU;
        this.size = size;
        this.color = color;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getSKU() {
        return SKU;
    }

    public void setSKU(String SKU) {
        this.SKU = SKU;
    }

    public WearableType getWearableType() {
        return wearableType;
    }

    public void setWearableType(WearableType wearableType) {
        this.wearableType = wearableType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Wearable wearable = (Wearable) o;
        return wearableType == wearable.wearableType && Objects.equals(SKU, wearable.SKU) && Objects.equals(size, wearable.size) && Objects.equals(color, wearable.color);
    }

    @Override
    public int hashCode() {
        return Objects.hash(wearableType, SKU, size, color);
    }
}