package com.bytepushers.family.model;

/**
 * The {@code GroupPackage} class represents a package designed for groups of attendees.
 * It extends the {@link Package} class and overrides the {@link Package#calculateTotalCost(int)}
 * method to calculate the total cost based on the price of the package and the number of attendees.
 *
 * <p>This package is typically used for group events or bulk bookings, where the cost per attendee
 * is fixed, and the total cost depends on the number of attendees.</p>
 *
 * <p>Example usage:</p>
 * <pre>
 * GroupPackage groupPackage = new GroupPackage();
 * double totalCost = groupPackage.calculateTotalCost(10); // calculates the total cost for 10 attendees
 * </pre>
 *
 * <p>Constructor Details:</p>
 * <ul>
 *   <li>Uses the {@code super()} constructor from the {@code Package} class to initialize the
 *       package with a predefined type, name, description, and a price of 200.</li>
 * </ul>
 *
 * <p>Author: Adish Timalsina</p>
 *
 * @see Package
 */
public class GroupPackage extends Package{

    /**
     * Default constructor that initializes the group package with a predefined type, name,
     * description, and a price of 200.
     * <p>Uses the {@code super} constructor of {@link Package} to set these values.</p>
     */
    public GroupPackage() {
        super("package","Group Package", "Group Package",200);
    }

    /**
     * Calculates the total cost for the group package. The total cost is determined by multiplying
     * the package price by the number of attendees.
     *
     * @param attendees the number of attendees for the group package.
     * @return the total cost of the group package, calculated as price * attendees.
     */
    @Override
    public double calculateTotalCost(int attendees){
        return this.getPrice()*attendees;
    };
}
