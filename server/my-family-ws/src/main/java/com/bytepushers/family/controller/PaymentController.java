package com.bytepushers.family.controller;

import com.bytepushers.family.model.Order;
import com.bytepushers.family.model.User;
import com.bytepushers.family.service.OrderService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins="*")
@SecurityRequirement(name = "X-API-Version")
public class PaymentController {
    private final OrderService orderService;

    public PaymentController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(value = "/orders", consumes = {"application/json"}, produces = {"application/json"})
    public ResponseEntity<?> createOrder(@Valid @RequestBody List<Order> order) {
         List<Order> orders = orderService.saveOrder(order);
        return new ResponseEntity<>(orders, HttpStatus.CREATED);
    }

    @GetMapping(value = "/orders", consumes = {"application/json"})
    public ResponseEntity<?> calculateOrder(@Valid @RequestBody List<Order> order, @RequestParam(required = false) String email) {
        double price =  orderService.calaculatePrice(order, email);
        return new ResponseEntity<>(price, HttpStatus.CREATED);
    }


}
