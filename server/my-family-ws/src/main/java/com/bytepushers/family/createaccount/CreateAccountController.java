package com.bytepushers.family.controllers;

import com.bytepushers.family.ApiResponse.*;
import com.bytepushers.family.DAOs.CreateAccountRepository;
import com.bytepushers.family.model.CreateAccount;
import jakarta.validation.Valid;
import com.bytepushers.family.services.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api", consumes = "application/json")
@CrossOrigin(origins="*")
public class CreateAccountController {
    private final CreateAccountRepository createAccountRepository;
    private final AccountService accountService;

    //constructor injection
    public CreateAccountController(CreateAccountRepository createAccountRepository, AccountService accountService) {
        this.createAccountRepository = createAccountRepository;
        this.accountService = accountService;
    }

    //create-account post api
    @PostMapping(value = "/create-account")
    public ResponseEntity<?> createAccount(@Valid @RequestBody CreateAccount createAccount, BindingResult bindingResult) {
        CreateAccount userCreated = accountService.createAccount(createAccount);

        //if user create successfully
        ApiResponse response = new ApiResponse(
                null,
                "user created successfully",
                201
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}