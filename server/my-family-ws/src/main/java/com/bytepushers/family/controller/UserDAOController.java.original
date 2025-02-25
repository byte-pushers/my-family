//        package com.bytepushers.family.controller;
//
//import com.bytepushers.family.dao.UserRepository;
//import com.bytepushers.family.exception.*;
//import com.bytepushers.family.model.User;
//
//import com.bytepushers.family.repo.UserRepository;
//import jakarta.validation.Valid;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api")
//public class UserDAOController {
//
//    @Autowired
//    private com.bytepushers.family.repo.UserRepository userDao;
//
//    // Create User Error with /{id} in URL
//    @PostMapping("/users/{id}")
//    public ResponseEntity<Object> createUserWithIdError(@PathVariable Integer id) {
//        List<Map<String, String>> errors = new ArrayList<>();
//
//        errors.add(Map.of(
//                "field", "id",  // Specify that the error is related to the 'id'
//                "code", "INVALID_FIELD",
//                "message", "ID should not be provided when creating a new user.",
//                "messageKey", "id_provided"
//        ));
//
//        // Return the error in the same format with a 400 status
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
//    }
//
//    // Create User
//    @PostMapping(value = "/users", consumes = "application/json", produces = "application/json")
//    public ResponseEntity<Object> createUser(
//            @Valid @RequestBody User user,
//            BindingResult bindingResult
//    ) {
//        // Initialize an ArrayList for errors
//        List<Map<String, String>> errors = new ArrayList<>();
//
//        // Check for validation errors
//        if (bindingResult.hasErrors()) {
//            bindingResult.getFieldErrors().forEach(error -> {
//                errors.add(Map.of(
//                        "field", error.getField(),
//                        "code", "INVALID_FIELD",
//                        "message", error.getDefaultMessage(),
//                        "messageKey", error.getCode()
//                ));
//            });
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
//        }
//
//        try {
//            // Check if a user with the same email already exists
//            if (userDao.findUserByEmail(user.getEmail()).isPresent()) {
//                throw new DuplicateUserException("A user with the email " + user.getEmail() + " already exists.");
//            }
//
//            // Check for a weak password
//            if (user.getPassword() != null && user.getPassword().length() < 8) {
//                throw new WeakPasswordException();
//            }
//
//            // Create the user
//            User createdUser = userDao.save(user);
//            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
//        } catch (DuplicateUserException e) {
//            errors.add(Map.of(
//                    "code", "DUPLICATE_USER",
//                    "message", e.getMessage(),
//                    "messageKey", "duplicate_user"
//            ));
//            return ResponseEntity.status(HttpStatus.CONFLICT).body(errors);
//        } catch (DatabaseOperationException e) {
//            errors.add(Map.of(
//                    "code", "DATABASE_ERROR",
//                    "message", e.getMessage(),
//                    "messageKey", "database_error"
//            ));
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
//        } catch (WeakPasswordException e) {
//            errors.add(Map.of(
//                    "code", "WEAK_PASSWORD",
//                    "message", e.getMessage(),
//                    "messageKey", "weak_password"
//            ));
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
//        } catch (Exception e) {
//            errors.add(Map.of(
//                    "code", "INTERNAL_SERVER_ERROR",
//                    "message", e.getMessage(),
//                    "messageKey", "server_error"
//            ));
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
//        }
//    }
//
//
//    // Get User by ID
//    @GetMapping(value = "/users/{id}", produces = "application/json")
//    public ResponseEntity<Object> getUserById(
//            @PathVariable Integer id,
//            @RequestBody(required = false) String body
//    ) {
//        List<Map<String, String>> errors = new ArrayList<>();
//        // Check if a request body was sent
//        if (body != null && !body.trim().isEmpty()) {
//            errors.add(Map.of(
//                    "code", "INVALID_BODY",
//                    "message", "Request body should not be provided for GET requests.",
//                    "messageKey", "body_not_allowed"
//            ));
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
//        }
//
//        try {
//            User user = userDao.findById(id).orElse(null);
//            if (user == null) {
//                errors.add(Map.of(
//                        "code", "USER_NOT_FOUND",
//                        "message", "User with ID " + id + " not found",
//                        "messageKey", "user_not_found"
//                ));
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
//            }
//            return new ResponseEntity<>(user, HttpStatus.OK);
//        } catch (UserNotFoundException e) {
//            errors.add(Map.of(
//                    "code", "USER_NOT_FOUND",
//                    "message", e.getMessage(),
//                    "messageKey", "user_not_found"
//            ));
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
//        } catch (DatabaseOperationException e) {
//            errors.add(Map.of(
//                    "code", "DATABASE_ERROR",
//                    "message", e.getMessage(),
//                    "messageKey", "database_error"
//            ));
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
//        } catch (Exception e) {
//            errors.add(Map.of(
//                    "code", "INTERNAL_SERVER_ERROR",
//                    "message", e.getMessage(),
//                    "messageKey", "server_error"
//            ));
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
//        }
//    }
//
//    // Update User
//    @PutMapping(value = "/users/{id}", consumes = "application/json", produces = "application/json")
//    public ResponseEntity<Object> updateUser(
//            @PathVariable Integer id,
//            @Valid @RequestBody(required = false) User user,
//            BindingResult bindingResult
//    ) {
//        List<Map<String, String>> errors = new ArrayList<>();
//
//        // Check if the request body is null
//        if (user == null) {
//            errors.add(Map.of(
//                    "code", "EMPTY_REQUEST_BODY",
//                    "message", "Request body must not be empty.",
//                    "messageKey", "empty_request_body"
//            ));
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
//        }
//
//        // Check for validation errors
//        if (bindingResult.hasErrors()) {
//            bindingResult.getFieldErrors().forEach(error -> {
//                errors.add(Map.of(
//                        "field", error.getField(),
//                        "code", "INVALID_FIELD",
//                        "message", error.getDefaultMessage(),
//                        "messageKey", error.getCode()
//                ));
//            });
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
//        }
//
//        try {
//            Optional<User> userOptional = userDao.findById(id);
//
//            // Check if user exists in the DB
//            if (userOptional.isEmpty()) {
//                throw new UserNotFoundException("User with ID " + id + " not found");
//            }
//
//            User existingUser = userOptional.get();
//
//            // Check for a weak password
//            if (user.getPassword() != null && user.getPassword().length() < 8) {
//                throw new WeakPasswordException();
//            }
//
//            // Check if the email or password matches the existing user data
//            boolean isSameEmail = existingUser.getEmail().equals(user.getEmail());
//            boolean isSamePassword = existingUser.getPassword().equals(user.getPassword());
//
//            if (isSameEmail && isSamePassword) {
//                errors.add(Map.of(
//                        "code", "NO_CHANGES_DETECTED",
//                        "message", "The provided email and password are the same as the existing user data.",
//                        "messageKey", "no_changes_detected"
//                ));
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
//            }
//
//            // Check if the email is already in use by another user
//            Optional<User> userWithSameEmail = userDao.findUserByEmail(user.getEmail());
//            if (userWithSameEmail.isPresent() && !userWithSameEmail.get().getId().equals(id)) {
//                throw new DuplicateUserException("A user with email " + user.getEmail() + " already exists.");
//            }
//
//            // Set the ID from the path variable into the user object
//            user.setId(id);
//
//            // Save the updated user information
//            User updatedUser = userDao.save(user);
//
//            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
//
//        } catch (DuplicateUserException e) {
//            errors.add(Map.of(
//                    "code", "DUPLICATE_USER",
//                    "message", e.getMessage(),
//                    "messageKey", "duplicate_user"
//            ));
//            return ResponseEntity.status(HttpStatus.CONFLICT).body(errors);
//        } catch (WeakPasswordException e) {
//            errors.add(Map.of(
//                    "code", "WEAK_PASSWORD",
//                    "message", e.getMessage(),
//                    "messageKey", "weak_password"
//            ));
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
//        } catch (UserNotFoundException e) {
//            errors.add(Map.of(
//                    "code", "USER_NOT_FOUND",
//                    "message", e.getMessage(),
//                    "messageKey", "user_not_found"
//            ));
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
//        } catch (DatabaseOperationException e) {
//            errors.add(Map.of(
//                    "code", "DATABASE_ERROR",
//                    "message", e.getMessage(),
//                    "messageKey", "database_error"
//            ));
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
//        } catch (Exception e) {
//            errors.add(Map.of(
//                    "code", "INTERNAL_SERVER_ERROR",
//                    "message", e.getMessage(),
//                    "messageKey", "server_error"
//            ));
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
//        }
//    }
//
//    // Delete User
//    @DeleteMapping(value = "/users/{id}", produces = "application/json")
//    public ResponseEntity<Object> deleteUser(
//            @PathVariable Integer id,
//            @RequestBody(required = false) String body
//    ) {
//        List<Map<String, String>> errors = new ArrayList<>();
//
//        // Check if a request body was sent
//        if (body != null && !body.trim().isEmpty()) {
//            errors.add(Map.of(
//                    "code", "INVALID_BODY",
//                    "message", "Request body should not be provided for DELETE requests.",
//                    "messageKey", "body_not_allowed"
//            ));
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
//        }
//
//        try {
//            // Check if the user exists
//            boolean userExists = userDao.existsById(id);
//            if (!userExists) {
//                throw new UserNotFoundException("User with ID " + id + " not found");
//            }
//
//            // Delete the user
//            userDao.deleteById(id);  // This will delete the user from the database
//
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // Success, no content response
//
//        } catch (UserNotFoundException e) {
//            errors.add(Map.of(
//                    "code", "USER_NOT_FOUND",
//                    "message", e.getMessage(),
//                    "messageKey", "user_not_found"
//            ));
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
//        } catch (UserDeletionFailedException e) {
//            errors.add(Map.of(
//                    "code", "DELETION_FAILED",
//                    "message", e.getMessage(),
//                    "messageKey", "deletion_failed"
//            ));
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
//        } catch (Exception e) {
//            errors.add(Map.of(
//                    "code", "INTERNAL_SERVER_ERROR",
//                    "message", e.getMessage(),
//                    "messageKey", "server_error"
//            ));
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
//        }
//    }
//}