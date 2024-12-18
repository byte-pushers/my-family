package com.bytepushers.family.model;

/**
 * The {@code FamilyPackage} class represents a special type of package designed for family events.
 * It extends the {@link Package} class and provides a specific implementation for calculating
 * the total cost based on the number of attendees. The price of this package is multiplied by
 * the number of attendees to calculate the total cost.
 *
 * <p>The family package is typically used for events where families attend and each attendee
 * needs to be accounted for in the total cost calculation.</p>
 *
 * <p>Example usage:</p>
 * <pre>
 * FamilyPackage familyPackage = new FamilyPackage();
 * double totalCost = familyPackage.calculateTotalCost(4); // calculates cost for 4 attendees
 * </pre>
 *
 * <p>Constructor Details:</p>
 * <ul>
 *   <li>Uses the {@code super()} constructor from the {@code Package} class to initialize the
 *       package with a default price of 100 and description of "family package".</li>
 * </ul>
 *
 * <p>Author: Adish Timalsina</p>
 *
 * @see Package
 */
public class FamilyPackage extends Package {

    /**
     * Default constructor that initializes the family package with a predefined type, name,
     * description, and price of 100.
     * <p>Uses the {@code super} constructor of {@link Package} to set these values.</p>
     */
    public FamilyPackage() {
       super("Package","family package", "family package",100);
    }

    /**
     * Calculates the total cost for the family package based on the number of attendees.
     * The total cost is computed by multiplying the price of the package by the number of attendees.
     *
     * @param attendees the number of attendees for the family package.
     * @return the total cost of the family package for the given number of attendees.
     */
    @Override
    public double calculateTotalCost(int attendees) {
        return this.getPrice() * attendees;
    }

}
