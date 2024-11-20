package com.bytepushers.family.service;

import com.bytepushers.family.model.Merchandise;
import com.bytepushers.family.model.Package;
import org.springframework.stereotype.Service;

@Service
public interface CostService {
    double calculateTotalCost(Merchandise merchandise, int quantity, Package selectedPackage, int numberOfPeople, double price);
}
