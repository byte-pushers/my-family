package com.bytepushers.family.model;

/**
 * The {@code Item} interface defines the blueprint for various items with basic attributes
 * such as type, name, description, and price. Additionally, it provides a method to calculate
 * the total cost based on the number of attendees or units required.
 *
 * <p>Implementing classes must define the behavior for these methods to handle specific
 * item-related details and calculations.</p>
 *
 * <p>Methods:</p>
 * <ul>
 *   <li>{@code getType()}, {@code setType(String type)} - Accessor and mutator for the item type.</li>
 *   <li>{@code getName()}, {@code setName(String name)} - Accessor and mutator for the item name.</li>
 *   <li>{@code getDescription()}, {@code setDescription(String description)} - Accessor and mutator for the item description.</li>
 *   <li>{@code getPrice()}, {@code setPrice(double price)} - Accessor and mutator for the item price.</li>
 *   <li>{@code calculateTotalCost(int attendees)} - Abstract method to calculate the total cost
 *       based on the number of attendees or units.</li>
 * </ul>
 *
 * <p>This interface is suitable for any context where items with these attributes
 * need to be handled generically, such as in inventory systems, e-commerce platforms, or event planning.</p>
 */
public interface Item {

    /**
     * Retrieves the type of the item.
     *
     * @return the type of the item.
     */
    String getType();

    /**
     * Retrieves the name of the item.
     *
     * @return the name of the item.
     */
    String getName();

    /**
     * Retrieves the description of the item.
     *
     * @return the description of the item.
     */
    String getDescription();

    /**
     * Retrieves the price of the item.
     *
     * @return the price of the item.
     */
    double getPrice();

    /**
     * Sets the type of the item.
     *
     * @param type the type of the item.
     */
    void setType(String type);

    /**
     * Sets the name of the item.
     *
     * @param name the name of the item.
     */
    void setName(String name);

    /**
     * Sets the description of the item.
     *
     * @param description the description of the item.
     */
    void setDescription(String description);

    /**
     * Sets the price of the item.
     *
     * @param price the price of the item.
     */
    void setPrice(double price);

    /**
     * Calculates the total cost based on the number of attendees or units required.
     *
     * @param attendees the number of attendees or units for which the total cost is calculated.
     * @return the total cost.
     */
    public abstract double calculateTotalCost(int attendees);
}
