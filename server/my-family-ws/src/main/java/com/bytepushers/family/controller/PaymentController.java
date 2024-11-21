package com.bytepushers.family.controller;

import com.bytepushers.family.model.*;
import com.bytepushers.family.model.Package;
import com.bytepushers.family.service.CostService;
import com.bytepushers.family.service.CostServiceImpl;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "X-API-Version")
public class PaymentController {

    private final CostService costService;
    private final CostServiceImpl costServiceImpl;

    public PaymentController(CostService costService, CostServiceImpl costServiceImpl) {
        this.costService = costService;
        this.costServiceImpl = costServiceImpl;
    }

    @GetMapping(value = "/payment", consumes = {"*/*"})
    public ResponseEntity<?> makePayment(@Valid @RequestParam String pakageType,
                                         @RequestParam int numberOfPeople,
                                         @RequestParam String merchName,
                                         @RequestParam String merchType,
                                         @RequestParam double price,
                                         @RequestParam int quantity) {

        Merchandise merchandise = createMerchandise(merchType, merchName, quantity, price);
        Package selectedPackage = createPackage(pakageType);

        double totalCost = costServiceImpl.calculateTotalCost(merchandise, quantity, selectedPackage, numberOfPeople, price);

        return new ResponseEntity<>(totalCost, HttpStatus.OK);
    }

    private Merchandise createMerchandise(String type, String name, int quantity, double price) {
        switch (type.toLowerCase()) {
            case "wearable":
                return new Wearable();
            case "book":
                return new Book();
            default:
                throw new IllegalArgumentException("Invalid merchandise type");
        }
    }

    private Package createPackage(String type) {
        switch (type.toLowerCase()) {
            case "individual":
                return new IndividualPackage();
            case "family":
                return new FamilyPackage();
            case "group":
                return new GroupPackage();
            case "free":
                return new FreePackage();
            default:
                throw new IllegalArgumentException("Invalid package type");
        }
    }

}


