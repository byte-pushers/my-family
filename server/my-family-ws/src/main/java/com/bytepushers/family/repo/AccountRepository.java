package com.bytepushers.family.repo;

import com.bytepushers.family.model.CreateAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<CreateAccount, Integer> {
    Optional<CreateAccount> findByEmail(String email);
}
