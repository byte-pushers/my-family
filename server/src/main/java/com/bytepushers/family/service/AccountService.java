package com.bytepushers.family.service;

import com.bytepushers.family.repo.AccountRepository;
import com.bytepushers.family.model.Account;
import jakarta.validation.Valid;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;

    }

    public Account createAccount(@Valid Account account) {

        //Check for the existing user
        Optional<Account> existingUser = accountRepository.findByEmail(account.getEmail());

        if(existingUser.isPresent()) {

            throw new DuplicateKeyException("User already exists");
        }

        return accountRepository.save(account);

    }
}