package com.bytepushers.family.service;

import com.bytepushers.family.model.*;
import com.bytepushers.family.model.Package;
import com.bytepushers.family.repo.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The {@code OrderService} class provides services for managing and processing {@link Order} entities.
 * This service includes methods for saving orders, processing payments, and calculating the total price of an order, including applicable taxes.
 *
 * <p>Services include:</p>
 * <ul>
 *   <li>Saving orders to the database</li>
 *   <li>Processing orders (e.g., through payment systems like Stripe)</li>
 *   <li>Calculating total price for orders, including taxes</li>
 * </ul>
 *
 * @author Adish Timalsina
 * @see Order
 * @see OrderRepository
 * @see AccountService
 * @see TaxService
 */
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final AccountService accountService;
    private final TaxService taxService;

    /**
     * Constructs a new {@code OrderService} with the given {@code OrderRepository}, {@code AccountService}, and {@code TaxService}.
     *
     * @param orderRepository the repository to interact with {@link Order} entities
     * @param accountService  the service to manage {@link Account} entities
     * @param taxService      the service to handle tax calculations
     */
    public OrderService(OrderRepository orderRepository, AccountService accountService, TaxService taxService) {
        this.orderRepository = orderRepository;
        this.accountService = accountService;
        this.taxService = taxService;
    }

    /**
     * Saves a list of orders to the database.
     *
     * @param order the list of {@link Order} entities to be saved
     * @return the saved list of {@link Order} entities
     */
    public List<Order> saveOrder(List<Order> order) {
        return orderRepository.saveAll(order);

    }

    /**
     * Processes an order (e.g., through a payment gateway like Stripe).
     *
     * @param totalPrice the total price of the order
     * @param order      the list of {@link Order} entities to be processed
     * @return {@code true} if the order is processed successfully, {@code false} otherwise
     */
    //TODO: process order through stripe
    public boolean processOrder(double totalPrice, List<Order> order) {
        return true;
    }

    /**
     * Calculates the total price of a list of orders, including the applicable tax rate for the user's state.
     *
     * <p>Each order is processed based on its type (e.g., "wearable", "book", "family", etc.), and the total cost is calculated
     * based on the price of the items and the attendees (if applicable). The tax is calculated based on the user's state.</p>
     *
     * @param orders the list of {@link Order} entities to calculate the price for
     * @param email  the email address of the user placing the order
     * @return the total price of the orders, including tax
     */
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
