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

/**
 * The {@code AccountService} class provides services for managing {@link Account} entities.
 * This class includes business logic for creating, retrieving, updating, and deleting accounts,
 * as well as for validating account data like checking for duplicate emails and securely encrypting passwords.
 * <p>It interacts with the {@link AccountRepository} to perform CRUD operations on {@link Account} entities.</p>
 *
 * <p>Services include:</p>
 * <ul>
 *   <li>Creating an account with email uniqueness check</li>
 *   <li>Finding accounts by ID, name, username, or email</li>
 *   <li>Updating account details</li>
 *   <li>Deleting accounts</li>
 * </ul>
 *
 * @author Adish Timalsina
 * @see Account
 * @see AccountRepository
 * @see BCryptPasswordEncoder
 */
@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);

    /**
     * Constructs a new {@code AccountService} with the given {@code AccountRepository}.
     *
     * @param accountRepository the repository to interact with {@link Account} entities
     */
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    /**
     * Creates a new account with encrypted password and checks for existing users.
     *
     * @param account the account to be created
     * @return the created {@link Account}
     * @throws DuplicateKeyException if the account with the same email already exists
     */
    public Account createAccount(Account account) {

        //Check for the existing user
        Optional<Account> existingUser = accountRepository.findByEmail(account.getEmail());

        if (existingUser.isPresent()) {

            throw new DuplicateKeyException("User already exists");
        }

        //encrypt password using bcrypt
        if (account.getPassword() != null) {
            account.setPassword(bCryptPasswordEncoder.encode(account.getPassword()));
        }

        return accountRepository.save(account);

    }

    /**
     * Retrieves all accounts in the system.
     *
     * @return a list of all {@link Account} entities
     */
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    /**
     * Retrieves an account by its ID.
     *
     * @param id the ID of the account to be retrieved
     * @return the {@link Account} entity with the given ID
     * @throws NotFoundException if no account with the given ID exists
     */
    public Account getAccountById(Long id) {
        return accountRepository.findById(id).orElseThrow(() -> new NotFoundException("Account not found"));
    }

    /**
     * Retrieves a list of accounts by the first name.
     *
     * @param firstName the first name to search for
     * @return a list of {@link Account} entities with the given first name
     * @throws NotFoundException if no accounts with the given first name exist
     */
    public List<Account> getAccountByName(String firstName) {
        List<Account> account = accountRepository.findByFirstName(firstName);
        if (account.isEmpty() || account == null) {
            throw new NotFoundException("Account not found with name " + firstName);
        } else {
            return account;
        }
    }

    /**
     * Retrieves a list of accounts by the username.
     *
     * @param userName the username to search for
     * @return a list of {@link Account} entities with the given username
     * @throws NotFoundException if no accounts with the given username exist
     */
    public List<Account> getAccountByUserName(String userName) {
        List<Account> accounts = accountRepository.findByUserName(userName);
        if (accounts == null || accounts.isEmpty()) {
            throw new NotFoundException("Account not found with user Name " + userName);
        } else {
            return accounts;
        }
    }

    /**
     * Retrieves an account by email.
     *
     * @param email the email associated with the account
     * @return the {@link Account} entity with the given email
     * @throws NotFoundException if no account with the given email exists
     */
    public Account getAccountByEmail(String email) {
        return accountRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Account not found associated with email " + email));
    }

    /**
     * Updates an existing account with new information.
     *
     * @param id      the ID of the account to be updated
     * @param account the account data to update
     * @return the updated {@link Account}
     * @throws NotFoundException    if no account with the given ID exists
     * @throws InvalidUserException if the account cannot be updated
     */
    public Account updateAccount(Long id, Account account) {
        Account existingUser = accountRepository.findById(id).orElseThrow(() -> new NotFoundException("Account not found"));

        if (existingUser != null) {
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
        } else {
            throw new InvalidUserException("Account not found");
        }
    }

    /**
     * Deletes an account by its ID.
     *
     * @param id the ID of the account to be deleted
     * @return a confirmation message
     */
    public String deleteAccountById(Long id) {
        accountRepository.findById(id).ifPresent(accountRepository::delete);
        return "Account deleted";
    }


}