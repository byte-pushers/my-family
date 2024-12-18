package com.bytepushers.family.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * The {@code TaxService} class provides functionality for retrieving the sales tax rate
 * for a given state. The tax rates are predefined for each state and territory in the United States,
 * as well as for Puerto Rico and the District of Columbia.
 *
 * <p>The service provides a method to fetch the tax rate based on the state code.</p>
 *
 * <p>States that do not charge sales tax (e.g., Alaska, Delaware, Montana, New Hampshire, Oregon)
 * have a tax rate of 0.0.</p>
 *
 * @author Adish Timalsina
 */
@Service
public class TaxService {

    /**
     * A static map that stores the sales tax rates for each state.
     * The key is the state abbreviation (e.g., "TX" for Texas), and the value is the tax rate for that state.
     */
    private static final HashMap<String, Double> STATE_TAX_RATES = new HashMap<>();

    static {
        STATE_TAX_RATES.put("AL", 0.04);    // Alabama
        STATE_TAX_RATES.put("AK", 0.0);     // Alaska (no state sales tax)
        STATE_TAX_RATES.put("AZ", 0.056);   // Arizona
        STATE_TAX_RATES.put("AR", 0.065);   // Arkansas
        STATE_TAX_RATES.put("CA", 0.075);   // California
        STATE_TAX_RATES.put("CO", 0.029);   // Colorado
        STATE_TAX_RATES.put("CT", 0.0635);  // Connecticut
        STATE_TAX_RATES.put("DE", 0.0);     // Delaware (no state sales tax)
        STATE_TAX_RATES.put("FL", 0.06);    // Florida
        STATE_TAX_RATES.put("GA", 0.04);    // Georgia
        STATE_TAX_RATES.put("HI", 0.04);    // Hawaii (general excise tax)
        STATE_TAX_RATES.put("ID", 0.06);    // Idaho
        STATE_TAX_RATES.put("IL", 0.0625);  // Illinois
        STATE_TAX_RATES.put("IN", 0.07);    // Indiana
        STATE_TAX_RATES.put("IA", 0.06);    // Iowa
        STATE_TAX_RATES.put("KS", 0.065);   // Kansas
        STATE_TAX_RATES.put("KY", 0.06);    // Kentucky
        STATE_TAX_RATES.put("LA", 0.0445);  // Louisiana
        STATE_TAX_RATES.put("ME", 0.055);   // Maine
        STATE_TAX_RATES.put("MD", 0.06);    // Maryland
        STATE_TAX_RATES.put("MA", 0.0625);  // Massachusetts
        STATE_TAX_RATES.put("MI", 0.06);    // Michigan
        STATE_TAX_RATES.put("MN", 0.06875); // Minnesota
        STATE_TAX_RATES.put("MS", 0.07);    // Mississippi
        STATE_TAX_RATES.put("MO", 0.04225); // Missouri
        STATE_TAX_RATES.put("MT", 0.0);     // Montana (no state sales tax)
        STATE_TAX_RATES.put("NE", 0.055);   // Nebraska
        STATE_TAX_RATES.put("NV", 0.0685);  // Nevada
        STATE_TAX_RATES.put("NH", 0.0);     // New Hampshire (no state sales tax)
        STATE_TAX_RATES.put("NJ", 0.06625); // New Jersey
        STATE_TAX_RATES.put("NM", 0.05125); // New Mexico (gross receipts tax)
        STATE_TAX_RATES.put("NY", 0.04);    // New York
        STATE_TAX_RATES.put("NC", 0.0475);  // North Carolina
        STATE_TAX_RATES.put("ND", 0.05);    // North Dakota
        STATE_TAX_RATES.put("OH", 0.0575);  // Ohio
        STATE_TAX_RATES.put("OK", 0.045);   // Oklahoma
        STATE_TAX_RATES.put("OR", 0.0);     // Oregon (no state sales tax)
        STATE_TAX_RATES.put("PA", 0.06);    // Pennsylvania
        STATE_TAX_RATES.put("RI", 0.07);    // Rhode Island
        STATE_TAX_RATES.put("SC", 0.06);    // South Carolina
        STATE_TAX_RATES.put("SD", 0.045);   // South Dakota
        STATE_TAX_RATES.put("TN", 0.07);    // Tennessee
        STATE_TAX_RATES.put("TX", 0.0625);  // Texas
        STATE_TAX_RATES.put("UT", 0.0485);  // Utah
        STATE_TAX_RATES.put("VT", 0.06);    // Vermont
        STATE_TAX_RATES.put("VA", 0.053);   // Virginia
        STATE_TAX_RATES.put("WA", 0.065);   // Washington
        STATE_TAX_RATES.put("WV", 0.06);    // West Virginia
        STATE_TAX_RATES.put("WI", 0.05);    // Wisconsin
        STATE_TAX_RATES.put("WY", 0.04);    // Wyoming
        STATE_TAX_RATES.put("DC", 0.0575);  // District of Columbia
        STATE_TAX_RATES.put("PR", 0.11);    // Puerto Rico

    }

    /**
     * Retrieves the sales tax rate for the given state.
     *
     * @param state the two-letter abbreviation for the state (e.g., "TX" for Texas)
     * @return the sales tax rate for the given state, or 0.0 if the state does not charge sales tax
     */
    public double getTaxRate(String state) {
        return STATE_TAX_RATES.getOrDefault(state, 0.0);
    }
}
