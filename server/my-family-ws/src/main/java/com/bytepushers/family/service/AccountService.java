package com.bytepushers.family.service;

import com.bytepushers.family.exception.InvalidUserException;
import com.bytepushers.family.exception.NotFoundException;
import com.bytepushers.family.repo.AccountRepository;
import com.bytepushers.family.model.Account;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account createAccount(Account account) {

        //Check for the existing user
        Optional<Account> existingUser = accountRepository.findByEmail(account.getEmail());

        if(existingUser.isPresent()) {

            throw new DuplicateKeyException("User already exists");
        }

        //encrypt password using bcrypt
        if(account.getPassword() != null) {
            account.setPassword(bCryptPasswordEncoder.encode(account.getPassword()));
        }

        return accountRepository.save(account);

    }

    //find all account
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    //find account by id
    public Account getAccountById(Long id) {
       return accountRepository.findById(id).orElseThrow(() -> new NotFoundException("Account not found"));
    }

    //find account by name
    public List<Account> getAccountByName(String firstName) {
        List<Account> account = accountRepository.findByFirstName(firstName);
        if(account.isEmpty() || account == null) {
            throw new NotFoundException("Account not found with name " + firstName);
        }else{
            return account;
        }
    }

    //find account by username
        public List<Account> getAccountByUserName(String userName) {
            List<Account> accounts = accountRepository.findByUserName(userName);
            if(accounts == null || accounts.isEmpty()) {
                throw new NotFoundException("Account not found with user Name " + userName);
            }else{
                return accounts;
            }
        }

    //get account by email
    public Account getAccountByEmail(String email) {
        return accountRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Account not found associated with email " + email));
    }

    //update account
    public Account updateAccount(Long id, Account account) {
        Account existingUser = accountRepository.findById(id).orElseThrow(()->new NotFoundException("Account not found"));

        if(existingUser != null) {
            existingUser.setFirstName(account.getFirstName());
            existingUser.setMiddleName(account.getMiddleName());
            existingUser.setLastName(account.getLastName());
            existingUser.setNickName(account.getNickName());
            existingUser.setBirthday(account.getBirthday());
            existingUser.setAge(account.getAge());
           // existingUser.setPassword(account.getPassword());
            existingUser.setEmail(account.getEmail());
            existingUser.setAddress(account.getAddress());
            return accountRepository.save(existingUser);
        }else{
            throw new InvalidUserException("Account not found");
        }
    }

    //delete account
    public String deleteAccountById(Long id) {
        accountRepository.findById(id).ifPresent(accountRepository::delete);
        return "Account deleted";
    }


}