package com.bytepushers.family.controllers;

import com.bytepushers.family.ApiResponse.*;
import com.bytepushers.family.DAOs.CreateAccountRepository;
import com.bytepushers.family.model.CreateAccount;
import jakarta.validation.Valid;
import com.bytepushers.family.services.CreateAccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping("/api/v1/")
public class CreateAccountController {

    private final CreateAccountRepository createAccountRepository;
    private final CreateAccountService createAccountService;


    //constructor injection
    public CreateAccountController(CreateAccountRepository createAccountRepository, CreateAccountService createAccountService) {
        this.createAccountRepository = createAccountRepository;
        this.createAccountService = createAccountService;
    }

    //create-account post api
    @PostMapping("create-account")
    public ResponseEntity<Object> createAccount(
           @Valid @RequestBody CreateAccount createAccount,
           BindingResult bindingResult
    ) {

        CreateAccount userCreated = createAccountService.createAccount(createAccount);

        //if user create successfully
        ApiResponse response = new ApiResponse(
                null,
                "user created successfully",
                201
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


}
