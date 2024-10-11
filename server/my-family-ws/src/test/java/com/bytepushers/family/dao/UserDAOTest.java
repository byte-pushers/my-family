package com.bytepushers.family.dao;

import com.bytepushers.family.exception.UserNotFoundException;
import com.bytepushers.family.model.User;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserDAOTest {
    private static final Logger logger = LoggerFactory.getLogger(UserDAOTest.class);
    @Autowired
    UserDAO userDAO;

    private User testUser;

    @BeforeEach
    public void setUp() {
        // creating a user before each test
        testUser = new User();
        testUser.setEmail("test@test.com");
        testUser.setPassword("password");

        testUser = userDAO.createUser(testUser);
    }


//    @AfterEach
    public void tearDown() {
        // delete the user after each test
        if (testUser.getId() != null) {
            try {
                logger.info("Cleaning up: deleting user with ID " + testUser.getId());
                userDAO.deleteUser(testUser.getId());
            } catch (UserNotFoundException e) {
                logger.warn("Test user with ID " + testUser.getId() + " was already deleted.");
            }
        } else {
            logger.warn("Test user was not created, nothing to clean up");
        }
    }

    // Create Operation Test
    @Test
    @Order(1)
    public void createUserTest() {
        String expectedUserEmail = "test@test.com";

        User createdUser = userDAO.createUser(testUser);

        assertNotNull(createdUser.getId(), "The user ID should not be null after creation.");
        assertEquals(expectedUserEmail, createdUser.getEmail(), "The user email should match the input email.");

        logger.info("Create User Test passed: Created user with ID {}", createdUser.getId());
    }

    // Read operation test (Find By Id)
    @Test
    @Order(2)
    public void readUserTest() {
        User foundUser = userDAO.findUserById(testUser.getId());

        assertNotNull(foundUser, "The user ID should not be null.");
        assertEquals(testUser.getEmail(), foundUser.getEmail(), "The user email should match the input email.");

        logger.info("Read User Test passed: Found user with ID {}", foundUser.getId());
    }

    // Update operation test
    @Test
    @Order(3)
    public void updateUserTest() {
        String newPassword = "omg";

        testUser.setPassword(newPassword);
        userDAO.updateUser(testUser);

        User updatedUser = userDAO.findUserById(testUser.getId());

        assertNotNull(updatedUser.getId(), "The user ID should not be null.");
        assertEquals(newPassword, updatedUser.getPassword(), "The user password should be updated.");

        logger.info("Update User Test passed: Updated user with ID {}", updatedUser.getId());
    }

    // Delete Operation Test
    @Test
    @Order(4)
    public void deleteUserTest() {
        userDAO.deleteUser(testUser.getId());

        logger.info("Delete User Test passed: Deleted user with ID {}", testUser.getId());
    }
}