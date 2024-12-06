package com.bytepushers.family.model;

/**
 * The {@code Package} class is an abstract class that extends {@code ShoppingItem}.
 * It represents a special package item, potentially associated with an event, that has a quantity and a cost.
 *
 * <p>Annotations:</p>
 * <ul>
 *   <li>{@code @Entity} - Marks this class as a JPA entity if this were to be used in a JPA context (though it might be abstract in this case).</li>
 *   <li>{@code @Inheritance} and {@code @DiscriminatorColumn} would typically be used in concrete subclasses to define inheritance strategies for JPA (though omitted in this abstract class).</li>
 * </ul>
 *
 * <p>Attributes:</p>
 * <ul>
 *   <li>{@code attendees} - The number of attendees that the package supports.</li>
 * </ul>
 *
 * <p>Constructors:</p>
 * <ul>
 *   <li>Default constructor to initialize the object (for JPA usage).</li>
 *   <li>Parameterized constructor to initialize the package with type, name, description, and price.</li>
 *   <li>Parameterized constructor to initialize the package with type, name, description, price, quantity, and attendees.</li>
 * </ul>
 *
 * <p>Methods:</p>
 * <ul>
 *   <li>Getter and setter methods for the {@code attendees} attribute.</li>
 *   <li>{@code calculateTotalCost(int attendees)} - An abstract method that needs to be implemented by subclasses to calculate the total cost based on the number of attendees and other attributes.</li>
 * </ul>
 *
 * <p>Author: Adish Timalsina</p>
 */
public abstract class Package extends ShoppingItem{

    /** The number of attendees the package supports. */
    private int attendees;

    /**
     * Default constructor for JPA.
     */
    public Package() {
    }

    /**
     * Constructs a {@code Package} object with the specified type, name, description, and price.
     *
     * @param type        the type of the package (e.g., VIP, Regular).
     * @param name        the name of the package.
     * @param description the description of the package.
     * @param price       the price of the package.
     */
    public Package(String type, String name, String description, double price) {
        super(type, name, description, price);
    }

    /**
     * Constructs a {@code Package} object with the specified details.
     *
     * @param type        the type of the package (e.g., VIP, Regular).
     * @param name        the name of the package.
     * @param description the description of the package.
     * @param price       the price of the package.
     * @param quantity    the quantity of the package.
     * @param attendees   the number of attendees the package supports.
     */
    public Package(String type, String name, String description, double price, int quantity, int attendees) {
        super(type, name, description, price);
        this.attendees = attendees;
    }

    /**
     * Gets the number of attendees the package supports.
     *
     * @return the number of attendees.
     */
    public int getAttendees() {
        return attendees;
    }

    /**
     * Sets the number of attendees the package supports.
     *
     * @param attendees the number of attendees to set.
     */
    public void setAttendees(int attendees) {
        this.attendees = attendees;
    }

//    public static double calculatePackageCost(int attendees, double price) {
//        return  attendees * price;
//    };

    /**
     * Abstract method to calculate the total cost of the package.
     * This method must be implemented by the subclasses of {@code Package} to compute the cost based on specific logic.
     *
     * @param attendees the number of attendees for the package.
     * @return the total cost of the package.
     */
    @Override
    public abstract double calculateTotalCost(int attendees);
}
