package com.bytepushers.family.repo;

import com.bytepushers.family.model.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    User findUserByEmail(String email);
}