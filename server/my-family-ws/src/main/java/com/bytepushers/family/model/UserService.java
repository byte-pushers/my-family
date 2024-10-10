package com.bytepushers.family.model;


import com.bytepushers.family.model.User;
import com.bytepushers.family.dao.UserDAO;
//import com.bytepushers.family.model.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
//
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Base64;

@Service
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    //    private final UserRepo userRepository;
    private UserDAO userDAO = null;

    @Autowired
    public UserService(UserDAO userDao) {
        this.userDAO = userDao;
//        this.userRepository = userRepository;
    }


    public boolean login(String email, String base64Password) {
//        User user = userRepository.findByEmail(email);
        User user = userDAO.findUserByEmail(email);
        if (user == null) {
            logger.warn("User not found in DB for email: " + email);
            return false;
        }
        logger.info("User found: " + user.getEmail());
        logger.info("Database password: " + user.getPassword());
        logger.info("Input password: " + base64Password);

        String decodedPassword;
        try {
            // Decode the password from Base64
            decodedPassword = new String(Base64.getDecoder().decode(base64Password));
        } catch (IllegalArgumentException e) {
            logger.warn("Failed to decode password for email: " + email);
            return false;
        }

        logger.info("Database password: " + user.getPassword());
        logger.info("Input decoded password: " + decodedPassword);

        if (user.getPassword().equals(decodedPassword)) {
            return true;  // Login successful
        }

        logger.warn("Login failed for user: " + email);
        return false;  // Login failed
    }

}