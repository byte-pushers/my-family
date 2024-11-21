package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "package_type", discriminatorType = DiscriminatorType.STRING)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "merchandiseType", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = IndividualPackage.class, name = "IndividualPackage"),
        @JsonSubTypes.Type(value = GroupPackage.class, name = "GroupPackage"),
        @JsonSubTypes.Type(value = FamilyPackage.class, name = "FamilyPackage"),
        @JsonSubTypes.Type(value = FreePackage.class, name = "FreePackage")
})
public abstract class Package {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String packageName;
    private double basePrice;

    public Package() {

    }

    public Package(String packageName, double basePrice) {
        this.packageName = packageName;
        this.basePrice = basePrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return packageName;
    }

    public void setName(String name) {
        this.packageName = name;
    }

    public double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public abstract double calculatePackageCost(double basePrice, int numberOfPeople);

}
