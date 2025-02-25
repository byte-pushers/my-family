package com.bytepushers.family.service;

import com.bytepushers.family.repo.UserRepository;
import com.bytepushers.family.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

/**
 * Service class for managing user-related operations.
 * Provides methods for user authentication and encapsulates the business logic for user management.
 * <p>
 * This service interacts with the UserRepository to perform database operations.
 * </p>
 *
 * @author Danny
 * @version 1.0
 */
@Service
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    /**
     * Constructor for UserService.
     * Initializes the service with a {@link UserRepository} to handle user data persistence.
     *
     * @param userRepository The UserRepository instance to be used for user-related database operations.
     */
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Validates user login credentials by verifying the email and password against stored data.
     *
     * @param email    The email address of the user attempting to log in.
     * @param password The password provided by the user during login.
     * @return {@code true} if the email exists in the database and the password matches the stored password;
     *         {@code false} otherwise.
     */
    public User login(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            // Extract the User from Optional
            User user = userOptional.get();

            logger.info("User found: " + user.getEmail());
            logger.info("Database password: " + user.getPassword());
            logger.info("Input password: " + password);

            if (user.getPassword().equals(password)) {
                return user;  // Login successful
            }
        }

        return null;  // Login failed
    }
}