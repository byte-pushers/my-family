package com.bytepushers.family.service;

import com.bytepushers.family.model.Merchandise;
import com.bytepushers.family.model.Package;
import org.springframework.stereotype.Service;

@Service
public class CostServiceImpl implements CostService {

    @Override
    public double calculateTotalCost(Merchandise merchandise, int quantity, Package selectedPackage, int numberOfPeople, double price){
        double merchandiseCost = merchandise.calculatePrice(quantity, price);
        double packageCost = selectedPackage.calculatePackageCost(selectedPackage.getBasePrice(),numberOfPeople);
        return merchandiseCost + packageCost;
    }
}
