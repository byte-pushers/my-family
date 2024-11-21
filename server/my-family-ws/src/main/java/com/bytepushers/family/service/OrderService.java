package com.bytepushers.family.service;

public class OrderService {
    public boolean processOrder(Order order) {

        // Todo: saveOrder
        // Todo: process Order via Stripe
        // Todo: return result.
    }

    public Cost calculatePrice(Order order) {

        // Todo: loop through order.getItems();
        // Todo: call order.calculatePrice() method on each item.
        // Todo: return OrderPrice (will include Taxes, Fees, ).
    }
}
