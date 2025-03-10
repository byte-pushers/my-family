package com.bytepushers.family.controller;

import com.bytepushers.family.model.Account;
import com.bytepushers.family.model.Order;
import com.bytepushers.family.service.AccountService;
import com.bytepushers.family.service.ApiService;
import com.bytepushers.family.service.OrderService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerListParams;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing orders and payments in the application. This controller provides endpoints for creating orders
 * and calculating order prices. The API supports order-related operations such as creating new orders and calculating the total price
 * based on a list of orders.
 * <p>
 * The controller exposes the following APIs:
 * - Creating a new order
 * - Calculating the total price of an order
 * </p>
 *
 * @author Adish Timalsina
 */
@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins="*")
@SecurityRequirement(name = "X-API-Version")
public class PaymentController {
    private final OrderService orderService;
    private final ApiService apiService;
    private final AccountService accountService;

    /**
     * Constructs an instance of {@link PaymentController} with the specified {@link OrderService}.
     *
     * @param orderService the service responsible for order-related business logic
     */
    public PaymentController(OrderService orderService, ApiService apiService, AccountService accountService) {
        this.orderService = orderService;
        this.apiService = apiService;
        this.accountService = accountService;
    }

    @GetMapping(value = "/payments", consumes = {"application/json"}, produces = {"application/json"})
    public String payment(@Valid @RequestBody List<Order> order) throws StripeException {

        Stripe.apiKey = apiService.getStripeApiKey();

        String text = orderService.processOrder( order);
        System.out.println(text);
       orderService.getCustomerPurchases("Casey11@gmail.com");
        return "your payment has successfully completed with id: " + text;

    }

    @GetMapping(value = "/payments/history")
    public ResponseEntity<?>paymentHistory(@RequestParam String email) throws StripeException {
        List<Session> history = orderService.getCustomerPurchases(email);
        return ResponseEntity.ok(history);
    }

    /**
     * Creates a new order with the provided order details. The order is saved in the system.
     *
     * @param order a list of {@link Order} objects containing the details of the orders to be created
     * @return a {@link ResponseEntity} containing the created orders and a status of {@link HttpStatus#CREATED}
     */
    @PostMapping(value = "/orders", consumes = {"application/json"}, produces = {"application/json"})
    public ResponseEntity<?> createOrder(@Valid @RequestBody List<Order> order) {
         List<Order> orders = orderService.saveOrder(order);
        return new ResponseEntity<>(orders, HttpStatus.CREATED);
    }

    /**
     * Calculates the total price of the provided orders. An optional email can be provided for additional pricing considerations
     * such as discounts or promotions based on the email.
     *
     * @param order a list of {@link Order} objects to calculate the price for
     * @param email an optional email address that may affect the pricing (e.g., for discounts)
     * @return a {@link ResponseEntity} containing the total price of the orders and a status of {@link HttpStatus#CREATED}
     */
    @GetMapping(value = "/orders", consumes = {"application/json"})
    public ResponseEntity<?> calculateOrder(@Valid @RequestBody List<Order> order, @RequestParam(required = false) String email) {
        double price =  orderService.calaculatePrice(order, email);
        return new ResponseEntity<>(price, HttpStatus.CREATED);
    }


}
