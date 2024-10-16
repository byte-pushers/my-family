package com.bytepushers.family.service;

import com.bytepushers.family.repo.AccountRepository;
import com.bytepushers.family.model.CreateAccount;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    private final AccountRepository createAccountRepository;
    public AccountService(AccountRepository createAccountRepository) {
        this.createAccountRepository = createAccountRepository;

    }

    public CreateAccount createAccount(CreateAccount createAccount) {

        //Check for the existing user
        Optional<CreateAccount> existingUser = createAccountRepository.findByEmail(createAccount.getEmail());

        if(existingUser.isPresent()) {

            throw new DuplicateKeyException("User already exists");
        }

        if(createAccount.getPassword() == null && createAccount.getPassword().isEmpty()
        && createAccount.getPassword().length() < 8 && createAccount.getFirstName()==null
        && createAccount.getFirstName().isEmpty() && createAccount.getLastName()==null
        && createAccount.getLastName().isEmpty() && createAccount.getEmail() == null && createAccount.getEmail().isEmpty()
        && createAccount.getBirthday() == null && createAccount.getAge()<0 && createAccount.getAddress() ==null) {
            throw new NullPointerException("Values cannot be null");
        }

        return createAccountRepository.save(createAccount);

    }
}
