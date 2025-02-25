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

/**
 * REST controller for managing accounts in the application. This controller handles CRUD operations for accounts
 * such as creating, retrieving, updating, and deleting account information.
 * <p>
 * The controller exposes APIs to create a new account, retrieve all accounts, search accounts by various parameters
 * (such as name, email, or ID), update an account, and delete an account.
 * </p>
 *
 * @author Adish Timalsina
 */
@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins="*")
@SecurityRequirement(name = "X-API-Version")
public class AccountController {
    private final AccountRepository createAccountRepository;
    private final AccountService accountService;

    /**
     * Constructs an instance of {@link AccountController} with the specified {@link AccountRepository} and {@link AccountService}.
     *
     * @param createAccountRepository the {@link AccountRepository} to interact with the database
     * @param accountService the {@link AccountService} to handle business logic for accounts
     */
    public AccountController(AccountRepository createAccountRepository, AccountService accountService) {
        this.createAccountRepository = createAccountRepository;
        this.accountService = accountService;
    }

    /**
     * Creates a new account with the provided account details.
     *
     * @param account the account details to be created
     * @param bindingResult holds any validation errors during the request
     * @return a {@link ResponseEntity} with the created account information and a status of {@link HttpStatus#CREATED}
     */
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

    /**
     * Retrieves a list of all accounts.
     *
     * @return a {@link ResponseEntity} containing a list of all accounts and a status of {@link HttpStatus#OK}
     */
    @GetMapping(value = "/accounts", produces = {"application/json"})
    public ResponseEntity<?> getAccounts() {
        List<Account> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    /**
     * Retrieves accounts based on optional query parameters (name, email, or id).
     *
     * @param name the name of the account to search for (optional)
     * @param email the email of the account to search for (optional)
     * @param id the id of the account to search for (optional)
     * @return a {@link ResponseEntity} containing the matching accounts and a status of {@link HttpStatus#OK},
     *         or a {@link ResponseEntity} with an error message if no parameter is provided
     */
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

    /**
     * Updates an existing account with the provided account details.
     *
     * @param id the id of the account to be updated
     * @param account the account details to update
     * @param bindingResult holds any validation errors during the request
     * @return a {@link ResponseEntity} containing the updated account and a status of {@link HttpStatus#OK}
     */
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

    /**
     * Deletes an account by its id.
     *
     * @param id the id of the account to delete
     * @return a {@link ResponseEntity} with a success message and a status of {@link HttpStatus#OK}
     */
    @DeleteMapping(value = "/accounts/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long id) {
       String message = accountService.deleteAccountById(id);

       return new ResponseEntity<>(message, HttpStatus.OK);
    }
}