package com.bytepushers.family.model;

import jakarta.persistence.*;

/**
 * The {@code BaseItem} class is an abstract base class for items, implementing the {@code Item} interface
 * and providing shared functionality for common item attributes and behavior.
 *
 * <p>This class is annotated with {@code @MappedSuperclass}, indicating that its fields will
 * be mapped to database columns for its subclasses but that this class itself is not a persistent entity.</p>
 *
 * <p>Attributes:</p>
 * <ul>
 *   <li>{@code id} - The unique identifier for the item, managed by JPA.</li>
 *   <li>{@code type} - The type/category of the item (e.g., product type).</li>
 *   <li>{@code name} - The name of the item.</li>
 *   <li>{@code description} - A brief description of the item.</li>
 *   <li>{@code price} - The price of the item.</li>
 * </ul>
 *
 * <p>Methods in this class provide getter and setter implementations for these fields, as well as
 * the basic infrastructure for extending classes to define specific behaviors (e.g.,
 * {@code calculateTotalCost}).</p>
 *
 * <p>Author: Adish Timalsina</p>
 */
@MappedSuperclass
public abstract class BaseItem implements Item{
    @Id
    @GeneratedValue
    private Long id;
    private  String type;
    private String name;
    private String description;
    private double price;

    /**
     * Default constructor required by JPA.
     */
    public BaseItem() {

    }

    /**
     * Constructs a {@code BaseItem} with the specified attributes.
     *
     * @param type        the type or category of the item.
     * @param name        the name of the item.
     * @param description a brief description of the item.
     * @param price       the price of the item.
     */
    public BaseItem(String type, String name, String description, double price) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    /** {@inheritDoc} */
    @Override
    public String getType() {
        return type;
    }

    /** {@inheritDoc} */
    @Override
    public String getName() {
        return name;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public double getPrice() {
        return price;
    }

    /** {@inheritDoc} */
    @Override
    public String getDescription() {
        return description;
    }

    /** {@inheritDoc} */
    @Override
    public void setType(String type) {
        this.type = type;
    }

    /** {@inheritDoc} */
    @Override
    public void setName(String name) {
        this.name = name;
    }

    /** {@inheritDoc} */
    @Override
    public void setDescription(String description) {
        this.description = description;
    }

    /** {@inheritDoc} */
    @Override
    public void setPrice(double price) {
        this.price = price;
    }

    /**
     * Sets the unique identifier for the item.
     *
     * @param id the unique identifier.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Retrieves the unique identifier for the item.
     *
     * @return the unique identifier.
     */
    public Long getId() {
        return id;
    }

//    @Override
//    public abstract double calculateTotalCost(int quantity, int attendees, double price);
}
