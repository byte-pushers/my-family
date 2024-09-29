package com.bytepushers.family.createaccount;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CreateAccountRepository extends JpaRepository<CreateAccount, Integer> {


    Optional<CreateAccount> findByEmail(String email);


    }
