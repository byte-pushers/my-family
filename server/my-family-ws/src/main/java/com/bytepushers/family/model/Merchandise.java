package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "merchandiseType", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Wearable.class, name = "WEARABLE"),
        @JsonSubTypes.Type(value = Book.class, name = "BOOK")
})
public abstract class Merchandise {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private MerchandiseType merchandiseType;
    private String productName;
    private float productPrice;

    @Column(name = "product_description", length = 1000)
    private String productDescription;
    private String productImageUrl;

    public Merchandise() {
    }

    public Merchandise(Long id, MerchandiseType merchandiseType, String productName, float productPrice, String productDescription, String productImageUrl) {
        this.id = id;
        this.merchandiseType = merchandiseType;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
        this.productImageUrl = productImageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MerchandiseType getMerchandiseType() {
        return merchandiseType;
    }

    public void setMerchandiseType(MerchandiseType merchandiseType) {
        this.merchandiseType = merchandiseType;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public float getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(float productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public String getProductImageUrl() {
        return productImageUrl;
    }

    public void setProductImageUrl(String productImageUrl) {
        this.productImageUrl = productImageUrl;
    }
}
