package com.bytepushers.family.controller;

import com.bytepushers.family.model.Login;
import com.bytepushers.family.model.ApiResponse;
import com.bytepushers.family.model.ErrorDetail;
import com.bytepushers.family.model.ErrorResponse;
import com.bytepushers.family.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/login")
    public ResponseEntity<String> loginInfo() {
        return ResponseEntity.ok("Login API is available. Use POST to authenticate.");
    }

    @PostMapping("/api/session")
    public ResponseEntity<Object> login(
            @RequestHeader(value = "Content-Type") String contentType,
            @RequestHeader(value = "Accept-Versions") String acceptVersions,
            @RequestBody Map<String, Object> requestBody) {

        // Create an ArrayList of errors to append to if there is more than one error
        List<Map<String, String>> errors = new ArrayList<>();

        // Check content type and version headers
        if (!"application/json".equals(contentType) || !"0.0.0.1".equals(acceptVersions)) {
            errors.add(Map.of(
                    "code", "INVALID_HEADERS",
                    "message", "Invalid or missing Content-Type or Accept-Versions headers",
                    "messageKey", "invalid_headers"
            ));
        }

        try {
            // Extract transactionId and credentials from request body
            String transactionId = (String) requestBody.get("transactionId");
            if (transactionId == null || transactionId.isEmpty()) {
                errors.add(Map.of(
                        "code", "MISSING_TRANSACTION_ID",
                        "message", "Transaction ID is required",
                        "messageKey", "missing_transaction_id"
                ));
            }

            Map<String, String> credentials = (Map<String, String>) requestBody.get("credentials");
            String username = credentials.get("username");
            String password = credentials.get("password");
            // Check if Username or Password fields are empty
            if (username.isEmpty() || password.isEmpty()) {
                errors.add(Map.of(
                        "code", "EMPTY_CREDENTIALS",
                        "message", "Username and password cannot be empty",
                        "messageKey", "empty_credentials"
                ));
            }
            // Validate credentials
            boolean isValid = userService.login(username, password);
            if (!isValid) {
                errors.add(Map.of(
                        "code", "UNAUTHORIZED",
                        "message", "Invalid email or password",
                        "messageKey", "invalid_credentials"
                ));
            }
        } catch (Exception e) {
            errors.add(Map.of(
                    "code", "INTERNAL_SERVER_ERROR",
                    "message", e.getMessage(),
                    "messageKey", "server_error"
            ));
        }
        if (!errors.isEmpty()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);

        return ResponseEntity.noContent().build(); // 204 No Content

    }


}