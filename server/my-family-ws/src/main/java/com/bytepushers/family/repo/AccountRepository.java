package com.bytepushers.family.repo;

import com.bytepushers.family.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByEmail(String email);
    List<Account> findByUserName(String userName);
    List<Account> findByFirstName(String firstName);
}
