package com.bytepushers.family.service;

import com.bytepushers.family.model.*;
import com.bytepushers.family.model.Package;
import com.bytepushers.family.repo.OrderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Invoice;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionListParams;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private final ApiService apiService;

    /**
     * Constructs a new {@code OrderService} with the given {@code OrderRepository}, {@code AccountService}, and {@code TaxService}.
     *
     * @param orderRepository the repository to interact with {@link Order} entities
     * @param accountService  the service to manage {@link Account} entities
     * @param taxService      the service to handle tax calculations
     */
    public OrderService(OrderRepository orderRepository, AccountService accountService, TaxService taxService, ApiService apiService) {
        this.orderRepository = orderRepository;
        this.accountService = accountService;
        this.taxService = taxService;
        this.apiService = apiService;
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

    public String getOrCreateCustomer(String email) throws StripeException {

        Account account = accountService.getAccountByEmail(email);

        Map<String, Object> searchParams = new HashMap<>();
        searchParams.put("email", email);

        List<Customer> customers = Customer.list(searchParams).getData();

       // System.out.println("here is customer matching with your email: " + customers);

        if(customers.isEmpty()){
            //System.out.println(customers.getEmail());
            //get the address of customer from account
            Address address = account.getAddress();
            //create params for customer address
            CustomerCreateParams.Address customerAddressParams = CustomerCreateParams.Address.builder()
                    .setLine1(address.getAddressLine1())
                    .setLine2(address.getAddressLine2())
                    .setCity(address.getCity())
                    .setState(address.getState())
                    .setPostalCode(address.getZipcode())
                    .setCountry(address.getCountry())
                    .build();

            CustomerCreateParams person =
                    CustomerCreateParams.builder()
                            .setName(account.getFirstName() + " " + account.getLastName())
                            .setEmail(account.getEmail())
                            .setAddress(customerAddressParams)
                            .build();

            Customer customer = Customer.create(person);
            return customer.getId();
        }
        return customers.getFirst().getId();
    }

    /**
     * Processes an order (e.g., through a payment gateway like Stripe).
     *
     * @param order      the list of {@link Order} entities to be processed
     * @return {@code true} if the order is processed successfully, {@code false} otherwise
     */
    //TODO: process order through stripe
    public String processOrder(List<Order> order, String email) throws StripeException {
        Account account = accountService.getAccountByEmail(email);
        if(account == null){
            return "Account not found";
        }

        //calculate the price of order with the tax
       // double Price = Math.ceil(calaculatePrice(order, account.getEmail()));

        Stripe.apiKey = apiService.getStripeApiKey();
       String customerId =  getOrCreateCustomer(account.getEmail());

        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

        for (Order orderItem : order) {
            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                    .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("USD")
                            .setProductData(
                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                            .setName(orderItem.getName())
                                            .setDescription(orderItem.getDescription())
                                            .build()
                            )
                                    .setUnitAmount((long)(orderItem.getPrice()*100))
                                    .build()
                            )
                    .setQuantity((long)orderItem.getQuantity())
                    .build();
            lineItems.add(lineItem);
        }

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCustomer(customerId)
                .setSuccessUrl("https://www.google.com")
                .setAutomaticTax(SessionCreateParams.AutomaticTax.builder()
                        .setEnabled(true)
                        .build()
                )
                .addAllLineItem(lineItems)
                .setInvoiceCreation(
                        SessionCreateParams.InvoiceCreation.builder()
                                .setEnabled(true)
                        .build()
                )
                .build();
        Session session = Session.create(params);
        return session.getUrl();
    }

    //retrieve customer current invoice
//    public Invoice getInvoice(String invoiceId) throws StripeException {
//            return Invoice.retrieve(invoiceId);
//    }

    //get all customer orders history
//    public List<Session> getCustomerPurchases(String email) throws StripeException {
//            Stripe.apiKey = apiService.getStripeApiKey();
//            String customerId = getOrCreateCustomer(email);
//
//            SessionListParams params = SessionListParams.builder()
//                    .setCustomer(customerId)
//                    .build();
//            return Session.list(params).getData();
//    }

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
//    public double calaculatePrice(List<Order> orders, String email) {
//        double totalCost = 0.0;
//
//        for (Order order : orders) {
//            System.out.println(order.getPrice());
//        }
//
//        for (Order order : orders) {
//            String type = order.getType().toLowerCase();
//            switch (type) {
//                case "wearable":
//                case "book":
//                    totalCost += Merchandise.calculateTotalCost(order);
//                    break;
//                case "family":
//                    FamilyPackage familyPackage = new FamilyPackage();
//                    totalCost += familyPackage.calculateTotalCost(order.getAttendees());
//                    break;
//                case "individual":
//                    IndividualPackage individualPackage = new IndividualPackage();
//                    totalCost += individualPackage.calculateTotalCost(order.getAttendees());
//                    break;
//                case "group":
//                    GroupPackage groupPackage = new GroupPackage();
//                    totalCost += groupPackage.calculateTotalCost(order.getAttendees());
//                    break;
//                case "free":
//                    FreePackage freePackage = new FreePackage();
//                    totalCost += freePackage.calculateTotalCost(order.getAttendees());
//                    break;
//            }
//        }
//
//        //find user account by email and get user state
//        Account account = accountService.getAccountByEmail(email);
//
//        String state = "TX";  //account.getState();
//
//        //calculate tax
//        double taxRate = taxService.getTaxRate(state);
//
//        //calculate tax amount
//        double taxAmount = taxRate * totalCost;
//
//        return totalCost + taxAmount;
//    }

//    public Order findOrderByOrderId(Long orderId) {
//        return null;
//    }
}
