package com.bytepushers.family.service;

import com.bytepushers.family.model.*;
import com.bytepushers.family.model.Package;
import com.bytepushers.family.repo.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final AccountService accountService;
    private final TaxService taxService;

    public OrderService(OrderRepository orderRepository, AccountService accountService, TaxService taxService) {
        this.orderRepository = orderRepository;
        this.accountService = accountService;
        this.taxService = taxService;
    }

    public List<Order> saveOrder(List<Order> order) {
        return orderRepository.saveAll(order);

    }
    //TODO: process order through stripe
    public boolean processOrder(double totalPrice, List<Order> order) {
        return true;
    }

    public double calaculatePrice(List<Order> orders, String email) {
        double totalCost = 0.0;

        for (Package order : orders) {
            String type = order.getType().toLowerCase();
            switch (type) {
                case "wearable":
                case "book":
                    totalCost += Merchandise.calculateTotalCost(order);
                    break;
                case "family":
                    FamilyPackage familyPackage = new FamilyPackage();
                   totalCost += familyPackage.calculateTotalCost(order.getAttendees());
                    break;
                case "individual":
                    IndividualPackage individualPackage = new IndividualPackage();
                    totalCost += individualPackage.calculateTotalCost(order.getAttendees());
                    break;
                case "group":
                    GroupPackage groupPackage = new GroupPackage();
                    totalCost += groupPackage.calculateTotalCost(order.getAttendees());
                    break;
                case "free":
                    FreePackage freePackage = new FreePackage();
                   totalCost += freePackage.calculateTotalCost(order.getAttendees());
                    break;
            }
        }

        //find user account by email and get user state
        Account account = accountService.getAccountByEmail(email);

        String state = "TX";  //account.getState();

        //calculate tax
        double taxRate = taxService.getTaxRate(state);

        //calculate tax amount
        double taxAmount = taxRate * totalCost;

        return totalCost + taxAmount;
    }

    public Order findOrderByOrderId(Long orderId) {
        return null;
    }
}
