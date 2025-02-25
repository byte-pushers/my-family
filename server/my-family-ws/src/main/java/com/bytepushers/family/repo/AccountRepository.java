package com.bytepushers.family.repo;

import com.bytepushers.family.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * The {@code AccountRepository} interface provides methods to interact with the {@link Account}
 * entity in the database. It extends {@link JpaRepository}, which provides basic CRUD operations
 * and custom queries for the {@code Account} entity.
 * <p>This repository is used to manage and query {@code Account} objects, which represent user
 * accounts in the system. It provides methods for finding accounts by various attributes like
 * email, username, and first name.</p>
 *
 * <p>The repository is annotated with {@link Repository}, indicating that it is a Spring Data
 * JPA repository. Spring Data JPA will automatically implement the required methods at runtime
 * based on the method signatures.</p>
 *
 * <p>Method Details:</p>
 * <ul>
 *   <li>{@link #findByEmail(String)}: Finds an account based on its email address.</li>
 *   <li>{@link #findByUserName(String)}: Finds a list of accounts based on the username.</li>
 *   <li>{@link #findByFirstName(String)}: Finds a list of accounts based on the user's first name.</li>
 * </ul>
 *
 * <p>Author: Adish Timalsina</p>
 *
 * @see Account
 * @see JpaRepository
 */
@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    /**
     * Finds an {@link Account} by its email address.
     *
     * @param email the email address of the account.
     * @return an {@link Optional} containing the account if found, or an empty {@link Optional} if no account is found.
     */
    Optional<Account> findByEmail(String email);

    /**
     * Finds a list of {@link Account} objects by the provided username.
     *
     * @param userName the username of the account.
     * @return a list of {@link Account} objects with the matching username. If no account is found, an empty list is returned.
     */
    List<Account> findByUserName(String userName);

    /**
     * Finds a list of {@link Account} objects by the provided first name.
     *
     * @param firstName the first name of the account holder.
     * @return a list of {@link Account} objects with the matching first name. If no account is found, an empty list is returned.
     */
    List<Account> findByFirstName(String firstName);
}
