package com.bytepushers.family.controller;

import com.bytepushers.family.api.APIErrorConstant;
import com.bytepushers.family.api.ApiResponse;
import com.bytepushers.family.api.ErrorResponse;
import com.bytepushers.family.api.LoginRequestPayload;
import com.bytepushers.family.model.ErrorDetail;
import com.bytepushers.family.model.Login;
import com.bytepushers.family.model.User;
import com.bytepushers.family.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins="*")
public class LoginController {

    @Autowired
    private UserService userService;


    // Basic login API for testing
    @GetMapping(value = "/sessions", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestPayload payload) {
        User user = null;

        if (payload.getCredentials() != null) {
            user = userService.login(payload.getCredentials().getUserName(), payload.getCredentials().getPassword());
        }

        if (user != null) {
            ApiResponse<User> response = new ApiResponse<>(user);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(APIErrorConstant.API_ERROR_DATA_NOT_FOUND, "Data Not Found", null, null));
        }
    }
}