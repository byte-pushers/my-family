package com.bytepushers.family.model;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    User findByEmail(String email);  // Find a user by email for login
}