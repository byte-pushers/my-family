package com.bytepushers.family.controller;

import com.bytepushers.family.model.CreateAccount;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CreateAccountController {

    //test api
    @GetMapping("/api/v1/home")
    public String home() {
        return "welcome to home";
    }

    //create-account post api
    @PostMapping("/api/v1/create-account")
    public String createAccount(
            @RequestBody CreateAccount createAccount
    ) {
        return "your account has been created"+ createAccount.toString();
    }
}
