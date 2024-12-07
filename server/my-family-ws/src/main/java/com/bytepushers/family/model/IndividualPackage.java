package com.bytepushers.family.model;

/**
 * The {@code IndividualPackage} class represents a package designed for individual attendees.
 * It extends the {@link Package} class and overrides the {@link Package#calculateTotalCost(int)}
 * method to calculate the total cost based on the price of the package and the number of attendees.
 *
 * <p>This package is typically used for events where each individual attendee is billed separately
 * with a fixed cost.</p>
 *
 * <p>Example usage:</p>
 * <pre>
 * IndividualPackage individualPackage = new IndividualPackage();
 * double totalCost = individualPackage.calculateTotalCost(1); // calculates the total cost for 1 attendee
 * </pre>
 *
 * <p>Constructor Details:</p>
 * <ul>
 *   <li>Uses the {@code super()} constructor from the {@code Package} class to initialize the
 *       package with a predefined type, name, description, and a price of 150.</li>
 * </ul>
 *
 * <p>Author: Adish Timalsina</p>
 *
 * @see Package
 */
public class IndividualPackage extends Package {

    /**
     * Default constructor that initializes the individual package with a predefined type, name,
     * description, and a price of 150.
     * <p>Uses the {@code super} constructor of {@link Package} to set these values.</p>
     */
    public IndividualPackage() {
        super("Package","individual package","individual package",150);
    }

    /**
     * Calculates the total cost for the individual package. Since this package is for individual
     * attendees, the total cost is always the price of the package, regardless of the number of attendees.
     *
     * @param attendees the number of attendees for the individual package. This value is ignored
     *                  as the cost is fixed per individual.
     * @return the total cost of the individual package, which is the price for a single individual.
     */
    @Override
    public double calculateTotalCost(int attendees){
        return this.getPrice()*1;
    };
}
