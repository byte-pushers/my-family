package com.bytepushers.family.service;


import com.bytepushers.family.repo.UserRepository;
import com.bytepushers.family.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@Service
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public boolean login(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            logger.warn("User not found in DB for email: " + email);
            return false;
        }

        // Extract the User from Optional
        User user = userOptional.get();

        logger.info("User found: " + user.getEmail());
        logger.info("Database password: " + user.getPassword());
        logger.info("Input password: " + password);

        if (user.getPassword().equals(password)) {
            return true;  // Login successful
        }

        logger.warn("Password mismatch for email: " + email);
        return false;  // Login failed
    }
}