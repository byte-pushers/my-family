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
import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    // TODO: change mapping to "/api/session"
    // Basic login API for testing
    @PostMapping("/api/session")
    public ResponseEntity<Object> login(
            @RequestHeader(value = "Content-Type") String contentType,
            @RequestHeader(value = "Accept-Versions") String acceptVersions,
            @RequestBody Map<String, Object> requestBody) {
        try {
            // Extract transactionId and credentials from request body
            String transactionId = (String) requestBody.get("transactionId");
            Map<String, String> credentials = (Map<String, String>) requestBody.get("credentials");
            String username = credentials.get("username");
            String password = credentials.get("password");

            // Validate credentials
            boolean isValid = userService.login(username, password);
            if (isValid) {
                return ResponseEntity.noContent().build(); // 204 No Content
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "code", "UNAUTHORIZED",
                        "message", "Invalid email or password",
                        "messageKey", "invalid_credentials"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "code", "INTERNAL_SERVER_ERROR",
                    "message", e.getMessage(),
                    "messageKey", "server_error"
            ));
        }
    }

//    @PostMapping("/api/session")
//    public ResponseEntity<Object> loginDummy(@RequestBody Map<String, Object> requestBody) {
//        // Just returning a successful response for testing purposes
//        return ResponseEntity.ok(Map.of(
//                "message", "Post request received successfully!",
//                "status", "success"
//        ));
//    }
}