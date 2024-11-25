package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;

/**
 * The {@code Merchandise} class represents items that can be purchased or used within the system.
 * It extends the {@code ShoppingItem} class and includes additional attributes and behavior specific
 * to merchandise, such as an image URL for the item.
 *
 * <p>Annotations:</p>
 * <ul>
 *   <li>{@code @Entity} - Indicates that this class is a JPA entity.</li>
 *   <li>{@code @Inheritance(strategy = InheritanceType.JOINED)} - Configures the inheritance strategy
 *   to store subclasses in separate tables, while maintaining a shared relationship with the parent
 *   {@code Merchandise} table.</li>
 *   <li>{@code @JsonTypeInfo} and {@code @JsonSubTypes} - Used for polymorphic serialization and
 *   deserialization with JSON, enabling subclasses like {@code Wearable} and {@code Book} to be
 *   recognized and properly handled based on their type.</li>
 * </ul>
 *
 * <p>Attributes:</p>
 * <ul>
 *   <li>{@code imageUrl} - The URL of an image representing the merchandise.</li>
 * </ul>
 *
 * <p>Methods:</p>
 * <ul>
 *   <li>{@code calculateTotalCost(Package packages)} - A static method to calculate the total cost
 *   of a {@code Package} based on its price and quantity.</li>
 *   <li>{@code calculateTotalCost(int attendees)} - Overrides the abstract method from {@code ShoppingItem}
 *   to provide specific total cost calculation logic (currently returns 0, intended for further
 *   implementation).</li>
 * </ul>
 *
 * <p>Constructors:</p>
 * <ul>
 *   <li>Parameterized constructors for initializing a {@code Merchandise} object with type, name,
 *   description, price, quantity, and optional image URL.</li>
 *   <li>Default constructor for JPA and deserialization purposes.</li>
 * </ul>
 *
 * <p>Author: Adish Timalsina</p>
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Wearable.class, name = "wearable"),
        @JsonSubTypes.Type(value = Book.class, name = "book")
})
public class Merchandise extends ShoppingItem {

    /** The URL of an image representing the merchandise. */
    private String imageUrl;

    /**
     * Constructs a {@code Merchandise} object with the specified attributes.
     *
     * @param type        the type or category of the merchandise.
     * @param name        the name of the merchandise.
     * @param description a brief description of the merchandise.
     * @param price       the price of the merchandise.
     * @param quantity    the quantity of the merchandise.
     */
    public Merchandise(String type, String name, String description, double price, int quantity) {
        super(type, name, description, price);
    }

    /**
     * Constructs a {@code Merchandise} object with the specified attributes, including an image URL.
     *
     * @param type        the type or category of the merchandise.
     * @param name        the name of the merchandise.
     * @param description a brief description of the merchandise.
     * @param price       the price of the merchandise.
     * @param imageUrl    the URL of an image representing the merchandise.
     */
    public Merchandise(String type, String name, String description, double price, String imageUrl) {
        super(type, name, description, price);
        this.imageUrl = imageUrl;
    }

    /**
     * Default constructor required by JPA.
     */
    public Merchandise() {

    }

    /**
     * Retrieves the URL of the image representing the merchandise.
     *
     * @return the image URL.
     */
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * Sets the URL of the image representing the merchandise.
     *
     * @param imageUrl the image URL.
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * Calculates the total cost of a {@code Package} based on its price and quantity.
     *
     * @param packages the package for which the total cost is calculated.
     * @return the total cost of the package.
     */
    public static double calculateTotalCost(Package packages){
        return packages.getPrice() * packages.getQuantity();
    };

    /**
     * Calculates the total cost of the merchandise. Currently, this method returns 0 and is
     * intended for further implementation.
     *
     * @param attendees the number of attendees or units required for the calculation.
     * @return the total cost of the merchandise (currently 0).
     */
    @Override
    public double calculateTotalCost(int attendees) {
        return 0;
    }


}
