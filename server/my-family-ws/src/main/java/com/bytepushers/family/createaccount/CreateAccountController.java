package com.bytepushers.family.createaccount;

import com.bytepushers.family.ApiResponse.*;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
public class CreateAccountController {

    private final CreateAccountRepository createAccountRepository;
    private final CreateAccountService createAccountService;


    //constructor injection
    public CreateAccountController(CreateAccountRepository createAccountRepository, CreateAccountService createAccountService) {
        this.createAccountRepository = createAccountRepository;
        this.createAccountService = createAccountService;
    }

    //create-account post api
    @PostMapping("/api/v1/create-account")
    public ResponseEntity<Object> createAccount(
           @Valid @RequestBody CreateAccount createAccount,
           BindingResult bindingResult
    ) {
        CreateAccount userCreated = createAccountService.createAccount(createAccount);

        ApiResponse response = new ApiResponse(
                null,
                "user created successfully",
                201
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


}
