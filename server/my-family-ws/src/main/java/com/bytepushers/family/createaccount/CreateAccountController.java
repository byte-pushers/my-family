package com.bytepushers.family.createaccount;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CreateAccountController {

    private final CreateAccountRepository createAccountRepository;

    //constructor injection
    public CreateAccountController(CreateAccountRepository createAccountRepository) {
        this.createAccountRepository = createAccountRepository;
    }

    //test api
    @GetMapping("/api/v1/home")
    public String home() {
        return "welcome to home";
    }

    //create-account post api
    @PostMapping("/api/v1/create-account")
    public CreateAccount createAccount(
            @RequestBody CreateAccount createAccount
    ) {
        return createAccountRepository.save(createAccount);
    }
}
