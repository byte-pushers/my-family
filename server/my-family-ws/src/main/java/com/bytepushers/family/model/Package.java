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

    private String name;
    private Double basePrice;

//    @OneToOne(mappedBy = "eventPackage")
//    private Event event;

    public Package() {}

    public Package(String name, Double basePrice) {
        this.name = name;
        this.basePrice = basePrice;
    }

    public abstract Double calculateTotalPrice(int numPeople);

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

//    public Event getEvent() {
//        return event;
//    }
//
//    public void setEvent(Event event) {
//        this.event = event;
//    }
}
