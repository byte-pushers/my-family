package com.bytepushers.family.service;

import com.bytepushers.family.model.Merchandise;
import com.bytepushers.family.model.Package;
import org.springframework.stereotype.Service;

/**
 * Implementation of the CostService interface that provides functionality
 * to calculate the total cost of merchandise and selected packages.
 *
 * <p>This service is primarily used to calculate the total cost for a given merchandise item
 * and a package based on the specified quantity and number of people.</p>
 *
 * <p>Author: Adish Timalsina</p>
 */
@Service
public class CostServiceImpl implements CostService {

    /**
     * Calculates the total cost of merchandise and a selected package.
     *
     * <p>This method calculates the total cost by computing the cost of the merchandise
     * based on the provided quantity and unit price, and then adding the cost of the
     * selected package based on its base price and the number of people.</p>
     *
     * @param merchandise    the merchandise item for which the cost is to be calculated.
     * @param quantity       the quantity of the merchandise.
     * @param selectedPackage the package selected for the service.
     * @param numberOfPeople the number of people involved for the selected package.
     * @param price          the price per unit of the merchandise.
     * @return the total cost which is the sum of the merchandise cost and the package cost.
     */
    @Override
    public double calculateTotalCost(Merchandise merchandise, int quantity, Package selectedPackage, int numberOfPeople, double price){
        double merchandiseCost = merchandise.calculatePrice(quantity, price);
        double packageCost = selectedPackage.calculatePackageCost(selectedPackage.getBasePrice(),numberOfPeople);
        return merchandiseCost + packageCost;
    }
}
