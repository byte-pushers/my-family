package com.bytepushers.family.dao;

import com.bytepushers.family.model.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;


@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    // Standard CRUD operations
    // Not Needed with JPA
/*    User createUser(User user);
    User findUserById(Long id);
    List<User> findAllUsers();
    void updateUser(User user);
    void deleteUser(Long id);*/

    User findUserByEmail(String email);
}