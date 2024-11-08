package com.bytepushers.family.controller;

import com.bytepushers.family.repo.AccountRepository;
import com.bytepushers.family.model.Account;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import com.bytepushers.family.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins="*")
@SecurityRequirement(name = "X-API-Version")
public class AccountController {
    private final AccountRepository createAccountRepository;
    private final AccountService accountService;

    //constructor injection
    public AccountController(AccountRepository createAccountRepository, AccountService accountService) {
        this.createAccountRepository = createAccountRepository;
        this.accountService = accountService;
    }

    //create-account post api
    @PostMapping(value = "/accounts", produces = {"application/json"}, consumes={"application/json"})
    public ResponseEntity<?> createAccount(@Valid @RequestBody Account account, BindingResult bindingResult) {

//        if(bindingResult.hasErrors()) {
//            ArrayList<String> errors = new ArrayList<>();
//            bindingResult.getAllErrors().forEach(error -> {
//                errors.add(error.getDefaultMessage());
//            });
//            return new ResponseEntity<>(new ValidationErrorResponse(APIErrorConstant.API_ERROR_MIN_LENGTH_INPUT, errors.toString(), null,null), HttpStatus.BAD_REQUEST);
//        }

        Account userCreated = accountService.createAccount(account);

        //if user create successfully
        return new ResponseEntity<>(userCreated, HttpStatus.CREATED);
    }

    //get all account
    @GetMapping(value = "/accounts", produces = {"application/json"})
    public ResponseEntity<?> getAccounts() {
        List<Account> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    //get account by id, name, email
    @GetMapping(value = "/accounts/", produces = {"application/json"})
    public ResponseEntity<?> getAllAccountsByName(@RequestParam(required = false) String name,
                                                  @RequestParam(required = false) String email,
                                                  @RequestParam(required = false) Long id) {
        if(name != null) {
            List<Account>accounts = accountService.getAccountByName(name);
            return new ResponseEntity<>(accounts, HttpStatus.OK);
        }
        if(email != null) {
            ArrayList<Account> accounts = new ArrayList<>();
            Account account = accountService.getAccountByEmail(email);
            accounts.add(account);
            return new ResponseEntity<>(accounts, HttpStatus.OK);
        }
        if(id != null) {
            ArrayList<Account> accounts = new ArrayList<>();
            Account account = accountService.getAccountById(id);
            accounts.add(account);
            return new ResponseEntity<>(accounts, HttpStatus.OK);
        }

        return new ResponseEntity<>("Name, Email, or ID should be present",HttpStatus.BAD_REQUEST);
    }

    //update account
    @PatchMapping(value = "/accounts/update/{id}", consumes = {"application/json"}, produces = {"application/json"})
    public ResponseEntity<?> updateAccount(@PathVariable Long id, @Valid @RequestBody Account account, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }else{
            ArrayList<Account> accounts = new ArrayList<>();
            Account updatedAccount = accountService.updateAccount(id, account);
            accounts.add(updatedAccount);
            return new ResponseEntity<>(accounts, HttpStatus.OK);
        }
    }

    //deleted account
    @DeleteMapping(value = "/accounts/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long id) {
       String message = accountService.deleteAccountById(id);

       return new ResponseEntity<>(message, HttpStatus.OK);
    }
}