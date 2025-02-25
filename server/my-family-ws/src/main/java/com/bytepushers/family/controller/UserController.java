package com.bytepushers.family.controller;

import com.bytepushers.family.exception.*;
import com.bytepushers.family.model.User;
import com.bytepushers.family.repo.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Controller for managing user-related operations.
 * <p>
 * This controller provides endpoints to create, read, update, and delete users,
 * and includes error handling for common issues like validation errors, duplicate users,
 * and weak passwords.
 * </p>
 *
 * <p>Base URL: <code>/api/users</code></p>
 *
 * @author Danny Amezquita
 * @version 1.0
 */
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userDao;

    /**
     * Handles requests to create a user with an ID error.
     * This endpoint demonstrates returning a validation error if an ID is provided when creating a new user.
     *
     * @param id The ID provided in the request URL, which should not be present when creating a new user.
     * @return A {@link ResponseEntity} with a list of validation errors and an HTTP 400 status.
     */    @PostMapping("/users/{id}")
    public ResponseEntity<Object> createUserWithIdError(@PathVariable Long id) {
        List<Map<String, String>> errors = new ArrayList<>();

        errors.add(Map.of(
                "field", "id",  // Specify that the error is related to the 'id'
                "code", "INVALID_FIELD",
                "message", "ID should not be provided when creating a new user.",
                "messageKey", "id_provided"
        ));

        // Return the error in the same format with a 400 status
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    /**
     * Creates a new user in the system.
     *
     * @param user           The {@link User} object to create, validated against constraints.
     * @param bindingResult  Contains validation results for the provided user object.
     * @return A {@link ResponseEntity} containing the created user or a list of errors.
     */    @PostMapping(value = "/users", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> createUser(
            @Valid @RequestBody User user,
            BindingResult bindingResult
    ) {
        // Initialize an ArrayList for errors
        List<Map<String, String>> errors = new ArrayList<>();

        // Check for validation errors
        if (bindingResult.hasErrors()) {
            bindingResult.getFieldErrors().forEach(error -> {
                errors.add(Map.of(
                        "field", error.getField(),
                        "code", "INVALID_FIELD",
                        "message", Objects.requireNonNull(error.getDefaultMessage()),
                        "messageKey", Objects.requireNonNull(error.getCode())
                ));
            });
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            // Check if a user with the same email already exists
            if (userDao.findByEmail(user.getEmail()).isPresent()) {
                throw new DuplicateUserException("A user with the email " + user.getEmail() + " already exists.");
            }

            // Check for a weak password
            if (user.getPassword() != null && user.getPassword().length() < 8) {
                throw new WeakPasswordException();
            }

            // Create the user
            User createdUser = userDao.save(user);
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
        } catch (WeakPasswordException e) {
            errors.add(Map.of(
                    "code", "WEAK_PASSWORD",
                    "message", e.getMessage(),
                    "messageKey", "weak_password"
            ));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        } catch (Exception e) {
            errors.add(Map.of(
                    "code", "INTERNAL_SERVER_ERROR",
                    "message", e.getMessage(),
                    "messageKey", "server_error"
            ));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        }
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param id The ID of the user to retrieve.
     * @return A {@link ResponseEntity} containing the user data or an error if not found.
     */
    // Get User by ID
    @GetMapping(value = "/users/{id}", produces = "application/json")
    public ResponseEntity<Object> getUserById(
            @PathVariable Long id
    ) {
        List<Map<String, String>> errors = new ArrayList<>();

        try {
            Optional<User> userOptional = userDao.findById(id);
            if (userOptional.isEmpty()) {
                errors.add(Map.of(
                        "code", "USER_NOT_FOUND",
                        "message", "User with ID " + id + " not found",
                        "messageKey", "user_not_found"
                ));
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
            }

            // Retrieve the user object
            User user = userOptional.get();
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

    /**
     * Updates an existing user.
     *
     * @param id            The ID of the user to update.
     * @param user          The updated {@link User} data.
     * @param bindingResult Contains validation results for the provided user object.
     * @return A {@link ResponseEntity} containing the updated user or a list of errors.
     */    @PutMapping(value = "/users/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody User user,
            BindingResult bindingResult
    ) {
        List<Map<String, String>> errors = new ArrayList<>();

        // Check if the request body is null
        if (user == null) {
            errors.add(Map.of(
                    "code", "EMPTY_REQUEST_BODY",
                    "message", "Request body must not be empty.",
                    "messageKey", "empty_request_body"
            ));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        // Check for validation errors
        if (bindingResult.hasErrors()) {
            bindingResult.getFieldErrors().forEach(error -> {
                errors.add(Map.of(
                        "field", error.getField(),
                        "code", "INVALID_FIELD",
                        "message", Objects.requireNonNull(error.getDefaultMessage()),
                        "messageKey", Objects.requireNonNull(error.getCode())
                ));
            });
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            Optional<User> userOptional = userDao.findById(id);

            // Check if user exists in the DB
            if (userOptional.isEmpty()) {
                throw new UserNotFoundException("User with ID " + id + " not found");
            }

            User existingUser = userOptional.get();

            // Check for a weak password
            if (user.getPassword() != null && user.getPassword().length() < 8) {
                throw new WeakPasswordException();
            }

            // Check if the email or password matches the existing user data
            boolean isSameEmail = existingUser.getEmail().equals(user.getEmail());
            boolean isSamePassword = existingUser.getPassword().equals(user.getPassword());

            if (isSameEmail && isSamePassword) {
                errors.add(Map.of(
                        "code", "NO_CHANGES_DETECTED",
                        "message", "The provided email and password are the same as the existing user data.",
                        "messageKey", "no_changes_detected"
                ));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
            }

            // Check if the email is already in use by another user
            Optional<User> userWithSameEmail = userDao.findByEmail(user.getEmail());
            if (userWithSameEmail.isPresent() /*&& !userWithSameEmail.get().getId().equals(id)*/) {//TODO: LOOK AT LATER
                throw new DuplicateUserException("A user with email " + user.getEmail() + " already exists.");
            }

            // Set the ID from the path variable into the user object
            // user.setId(id); //TODO: LOOK AT LATER

            // Call the DAO to update the user
            User updatedUser = userDao.save(user);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);

        } catch (DuplicateUserException e) {
            errors.add(Map.of(
                    "code", "DUPLICATE_USER",
                    "message", e.getMessage(),
                    "messageKey", "duplicate_user"
            ));
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errors);
        } catch (WeakPasswordException e) {
            errors.add(Map.of(
                    "code", "WEAK_PASSWORD",
                    "message", e.getMessage(),
                    "messageKey", "weak_password"
            ));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
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

    /**
     * Deletes a user by their ID.
     *
     * @param id The ID of the user to delete.
     * @return A {@link ResponseEntity} with HTTP 204 (No Content) on success or an error if not found.
     */    @DeleteMapping(value = "/users/{id}", produces = "application/json")
    public ResponseEntity<Object> deleteUser(
            @PathVariable Long id
    ) {
        List<Map<String, String>> errors = new ArrayList<>();

        try {
            // Check if the user exists
            Optional<User> userOptional = userDao.findById(id);
            if (userOptional.isEmpty()) {
                throw new UserNotFoundException("User with ID " + id + " not found");
            }

            // Delete the user
            userDao.deleteById(id);  // This will delete the user from the database

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // Success, no content response

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