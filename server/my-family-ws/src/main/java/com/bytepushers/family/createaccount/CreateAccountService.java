package com.bytepushers.family.createaccount;

import com.bytepushers.family.ApiResponse.ErrorDetail;
import com.bytepushers.family.ApiResponse.ErrorResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CreateAccountService {
    private final CreateAccountRepository createAccountRepository;
    public CreateAccountService(CreateAccountRepository createAccountRepository) {
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
