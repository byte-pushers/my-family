package com.bytepushers.family.controller;

import com.bytepushers.family.dao.UserJdbcDAO;
import com.bytepushers.family.exception.DatabaseOperationException;
import com.bytepushers.family.exception.DuplicateUserException;
import com.bytepushers.family.exception.UserDeletionFailedException;
import com.bytepushers.family.exception.UserNotFoundException;
import com.bytepushers.family.model.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserDAOController {

    @Autowired
    private UserJdbcDAO userDao;

    // Create User
    @PostMapping(value = "/users", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> createUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        // Initialize an ArrayList for errors
        List<Map<String, String>> errors = new ArrayList<>();

        // Check for validation errors
        if (bindingResult.hasErrors()) {
            bindingResult.getFieldErrors().forEach(error -> {
                errors.add(Map.of(
                        "field", error.getField(),
                        "code", "INVALID_FIELD",
                        "message", error.getDefaultMessage(),
                        "messageKey", error.getCode()
                ));
            });
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            // Create the user
            User createdUser = userDao.createUser(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
            // TODO: Add duplicate functionality
        } catch (DuplicateUserException e) {
            errors.add(Map.of(
                    "code", "DUPLICATE_USER",
                    "message", e.getMessage(),
                    "messageKey", "duplicate_user"
            ));
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errors);
        } catch (DatabaseOperationException e) {
            errors.add(Map.of(
                    "code", "DATABASE_ERROR",
                    "message", e.getMessage(),
                    "messageKey", "database_error"
            ));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        } catch (Exception e) {
            errors.add(Map.of(
                    "code", "INTERNAL_SERVER_ERROR",
                    "message", e.getMessage(),
                    "messageKey", "server_error"
            ));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        }
    }

    // Get User by ID
    @GetMapping(value = "/users/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> getUserById(@PathVariable Integer id) {
        List<Map<String, String>> errors = new ArrayList<>();
        try {
            User user = userDao.findUserById(id);
            if (user == null) {
                errors.add(Map.of(
                        "code", "USER_NOT_FOUND",
                        "message", "User with ID " + id + " not found",
                        "messageKey", "user_not_found"
                ));
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
            }
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            errors.add(Map.of(
                    "code", "USER_NOT_FOUND",
                    "message", e.getMessage(),
                    "messageKey", "user_not_found"
            ));
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
        } catch (DatabaseOperationException e) {
            errors.add(Map.of(
                    "code", "DATABASE_ERROR",
                    "message", e.getMessage(),
                    "messageKey", "database_error"
            ));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        } catch (Exception e) {
            errors.add(Map.of(
                    "code", "INTERNAL_SERVER_ERROR",
                    "message", e.getMessage(),
                    "messageKey", "server_error"
            ));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        }
    }

    // Update User
    @PutMapping(value = "/users/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> updateUser(@PathVariable Integer id, @Valid @RequestBody User user, BindingResult bindingResult) {
        List<Map<String, String>> errors = new ArrayList<>();

        // Check for validation errors
        if (bindingResult.hasErrors()) {
            bindingResult.getFieldErrors().forEach(error -> {
                errors.add(Map.of(
                        "field", error.getField(),
                        "code", "INVALID_FIELD",
                        "message", error.getDefaultMessage(),
                        "messageKey", error.getCode()
                ));
            });
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            // Set the ID from the path variable into the user object
            user.setId(id);

            // Call the DAO to update the user
            User updatedUser = userDao.updateUser(user);
            if (updatedUser == null) {
                throw new UserNotFoundException("User with ID " + id + " not found");
            }
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            errors.add(Map.of(
                    "code", "USER_NOT_FOUND",
                    "message", e.getMessage(),
                    "messageKey", "user_not_found"
            ));
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
        } catch (DatabaseOperationException e) {
            errors.add(Map.of(
                    "code", "DATABASE_ERROR",
                    "message", e.getMessage(),
                    "messageKey", "database_error"
            ));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        } catch (Exception e) {
            errors.add(Map.of(
                    "code", "INTERNAL_SERVER_ERROR",
                    "message", e.getMessage(),
                    "messageKey", "server_error"
            ));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        }
    }

    // Delete User
    @DeleteMapping(value = "/users/{id}", produces = "application/json")
    public ResponseEntity<Object> deleteUser(@PathVariable Integer id) {
        List<Map<String, String>> errors = new ArrayList<>();
        try {
            boolean isDeleted = userDao.deleteUser(id);
            if (!isDeleted) {
                throw new UserNotFoundException("User with ID " + id + " not found");
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Success, no content response
        } catch (UserNotFoundException e) {
            errors.add(Map.of(
                    "code", "USER_NOT_FOUND",
                    "message", e.getMessage(),
                    "messageKey", "user_not_found"
            ));
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
        } catch (UserDeletionFailedException e) {
            errors.add(Map.of(
                    "code", "DELETION_FAILED",
                    "message", e.getMessage(),
                    "messageKey", "deletion_failed"
            ));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        } catch (Exception e) {
            errors.add(Map.of(
                    "code", "INTERNAL_SERVER_ERROR",
                    "message", e.getMessage(),
                    "messageKey", "server_error"
            ));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        }
    }
}