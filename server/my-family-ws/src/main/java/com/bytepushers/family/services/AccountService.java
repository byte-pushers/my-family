package com.bytepushers.family.services;

import com.bytepushers.family.DAOs.CreateAccountRepository;
import com.bytepushers.family.model.CreateAccount;
import jakarta.validation.Valid;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    private final CreateAccountRepository createAccountRepository;

    public AccountService(CreateAccountRepository createAccountRepository) {
        this.createAccountRepository = createAccountRepository;

    }

    public CreateAccount createAccount(@Valid CreateAccount createAccount) {

        //Check for the existing user
        Optional<CreateAccount> existingUser = createAccountRepository.findByEmail(createAccount.getEmail());

        if(existingUser.isPresent()) {

            throw new DuplicateKeyException("User already exists");
        }

        return createAccountRepository.save(createAccount);

    }
}
