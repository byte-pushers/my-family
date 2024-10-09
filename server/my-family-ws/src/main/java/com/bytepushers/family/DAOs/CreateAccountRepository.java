package com.bytepushers.family.DAOs;

import com.bytepushers.family.model.CreateAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CreateAccountRepository extends JpaRepository<CreateAccount, Integer> {

    Optional<CreateAccount> findByEmail(String email);


    }
