package com.bytepushers.family.model;
import jakarta.persistence.*;

/**
 * The {@code ShoppingItem} class serves as an abstract base class for items that involve
 * shopping-related attributes and behavior. It extends the {@code BaseItem} class and introduces
 * additional functionality for managing the quantity of items.
 *
 * <p>This class is annotated with {@code @MappedSuperclass}, which means its fields will
 * be mapped to database columns in its subclasses but it will not be persisted directly.</p>
 *
 * <p>Attributes:</p>
 * <ul>
 *   <li>{@code quantity} - The quantity of the item being purchased or managed.</li>
 * </ul>
 *
 * <p>Methods in this class provide getter and setter implementations for the {@code quantity}
 * attribute. It also lays the foundation for subclasses to define specific cost calculation logic
 * (e.g., {@code calculateTotalCost}).</p>
 *
 * <p>Author: Adish Timalsina</p>
 */
@MappedSuperclass
public abstract class ShoppingItem extends BaseItem {

    /** The quantity of the shopping item. */
    private int quantity;

    /**
     * Default constructor required by JPA.
     */
    public ShoppingItem() {}

    /**
     * Constructs a {@code ShoppingItem} with the specified attributes inherited from
     * the {@code BaseItem} class.
     *
     * @param type        the type or category of the item.
     * @param name        the name of the item.
     * @param description a brief description of the item.
     * @param price       the price of the item.
     */
    public ShoppingItem(String type, String name, String description, double price) {
        super(type, name, description, price);
    }

    /**
     * Retrieves the quantity of the shopping item.
     *
     * @return the quantity of the item.
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * Sets the quantity of the shopping item.
     *
     * @param quantity the quantity of the item.
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

//    @Override
//    public abstract double calculateTotalCost(int quantity, int attendees, double price);

}
