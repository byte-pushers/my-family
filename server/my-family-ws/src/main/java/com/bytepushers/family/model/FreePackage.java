package com.bytepushers.family.model;

/**
 * The {@code FreePackage} class represents a special type of package that is free of cost.
 * It extends the {@link Package} class and overrides the {@link Package#calculateTotalCost(int)}
 * method to always return a total cost of 0.0, regardless of the number of attendees.
 *
 * <p>This class is typically used for events or promotions where there is no charge for
 * the package, and it is provided at no cost to the attendees.</p>
 *
 * <p>Example usage:</p>
 * <pre>
 * FreePackage freePackage = new FreePackage();
 * double totalCost = freePackage.calculateTotalCost(5); // returns 0.0, as the package is free
 * </pre>
 *
 * <p>Constructor Details:</p>
 * <ul>
 *   <li>Uses the {@code super()} constructor from the {@code Package} class to initialize the
 *       package with a price of 0 and a description of "free package".</li>
 * </ul>
 *
 * <p>Author: Adish Timalsina</p>
 *
 * @see Package
 */
public class FreePackage extends Package {

    /**
     * Default constructor that initializes the free package with a predefined type, name,
     * description, and a price of 0 (since it's free).
     * <p>Uses the {@code super} constructor of {@link Package} to set these values.</p>
     */
    public FreePackage() {
        super("package","free package","free package",0);
    }

    /**
     * Calculates the total cost for the free package. Since this is a free package, the
     * total cost will always be 0.0, regardless of the number of attendees.
     *
     * @param attendees the number of attendees for the free package.
     * @return the total cost of the free package, which is always 0.0.
     */
    @Override
    public double calculateTotalCost(int attendees){
        return 0.0;
    };
}
