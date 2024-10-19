package com.bytepushers.family.controller;

import com.bytepushers.family.api.ApiResponse;
import com.bytepushers.family.repo.AccountRepository;
import com.bytepushers.family.model.Account;
import jakarta.validation.Valid;
import com.bytepushers.family.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api", consumes = "application/json")
@CrossOrigin(origins="*")
public class AccountController {
    private final AccountRepository createAccountRepository;
    private final AccountService accountService;

    //constructor injection
    public AccountController(AccountRepository createAccountRepository, AccountService accountService) {
        this.createAccountRepository = createAccountRepository;
        this.accountService = accountService;
    }

    //create-account post api
    @PostMapping(value = "/create-account")
    public ResponseEntity<?> createAccount(@Valid @RequestBody Account account, BindingResult bindingResult) {
        Account userCreated = accountService.createAccount(account);

        //if user create successfully
        ApiResponse<Account> response = new ApiResponse<>(userCreated);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}