package com.bytepushers.family.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
//
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService implements UserDetailsService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepo userRepository;

    @Autowired
    public UserService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }


    public boolean login(String email, String password) {
        User user = userRepository.findByEmail(email);
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}

//@Service
//public class UserService {
//    public boolean login(String email, String password) {
//        // Fake validation: always return true
//        return true; // Always consider login successful
//    }
//}
