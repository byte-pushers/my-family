package com.bytepushers.family.model;

import jakarta.persistence.*;

/**
 * The {@code Order} class represents an order for a package in the system.
 * It extends the {@link Package} class and overrides the {@link Package#calculateTotalCost(int)}
 * method to provide the total cost calculation for an order.
 *
 * <p>The {@code Order} class is typically used to represent the final purchase or order of a
 * package, with specific attributes like type, name, description, and price inherited from
 * the {@link Package} class. The {@code calculateTotalCost} method is overridden but returns
 * a default value of {@code 0.0}, implying that the total cost is handled separately or requires
 * more information for a real-world scenario.</p>
 *
 * <p>Constructor Details:</p>
 * <ul>
 *   <li>Uses the {@code super()} constructor from the {@code Package} class to initialize the
 *       order with predefined type, name, description, and price.</li>
 * </ul>
 *
 * @see Package
 */
@Entity
@Table(name = "orders")
public class Order extends Package{

    /**
     * Default constructor that initializes the order with default values. This constructor
     * is typically used when creating an {@code Order} instance without specifying any
     * initial properties.
     */
    public Order() {

    }

    /**
     * Constructor that initializes the order with the specified type, name, description, and price.
     * <p>This constructor is useful for creating an order with specific attributes.</p>
     *
     * @param type the type of the order (e.g., "package").
     * @param name the name of the order (e.g., "special order").
     * @param description a description of the order.
     * @param price the price of the order.
     */
    public Order(String type, String name, String description, double price) {
        super(type, name, description, price);
    }

    /**
     * Calculates the total cost for the order. In this case, the method is overridden but returns
     * {@code 0.0}, which implies that the actual cost may depend on external factors or
     * will be calculated elsewhere in the system.
     *
     * @param attendees the number of attendees for the order. In this implementation, the
     *                  number of attendees does not affect the calculation.
     * @return the total cost of the order, which is {@code 0.0} in this implementation.
     */
    @Override
    public double calculateTotalCost(int attendees){
       return 0.0;
    };
}
