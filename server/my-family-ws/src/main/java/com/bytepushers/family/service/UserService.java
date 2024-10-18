package com.bytepushers.family.service;

import com.bytepushers.family.model.User;
import com.bytepushers.family.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepo userRepository;

    @Autowired
    public UserService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }


    public boolean login(String email, String password) {
        User user = userRepository.findUserByEmail(email);
        if (user == null) {
            logger.warn("User not found in DB for email: " + email);
            return false;
        }
        logger.info("User found: " + user.getEmail());
        logger.info("Database password: " + user.getPassword());
        logger.info("Input password: " + password);

        if (user.getPassword().equals(password)) {
            return true;  // Login successful
        }
        logger.warn("Login failed for user: " + email);
        return false;  // Login failed
    }
}
