package com.bytepushers.family.controller;

import com.bytepushers.family.api.ApiResponse;
import com.bytepushers.family.api.ErrorResponse;
import com.bytepushers.family.model.ErrorDetail;
import com.bytepushers.family.model.Login;
import com.bytepushers.family.model.UserService;
import com.bytepushers.family.exception.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/api", produces = "application/json")
@CrossOrigin(origins="*")
public class LoginController {

    @Autowired
    private UserService userService;


    // Basic login API for testing
    @GetMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody Login login, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Handling validation errors
            ArrayList<String> errors = new ArrayList<>();
            bindingResult.getAllErrors().forEach(error -> {
                errors.add(error.getDefaultMessage());
            });
            return new ResponseEntity<>(new ErrorResponse("400", "Invalid Request", new ErrorDetail("LOGIN_VALIDATION_ERROR", String.join(", ", errors))), HttpStatus.BAD_REQUEST);
        }

        boolean isValid = userService.login(login.getEmail(), login.getPassword());
        if (isValid) {
            ApiResponse response = new ApiResponse(null, "Login successful", 200);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("401", "Unauthorized", new ErrorDetail("LOGIN_FAILED", "Invalid email or password")));
        }
    }
}