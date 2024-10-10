package com.bytepushers.family.dao;

import com.bytepushers.family.model.User;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
public interface UserDAO {

    // Standard CRUD operations
    User createUser(User user);
    User findUserById(Long id);
    List<User> findAllUsers();
    void updateUser(User user);
    void deleteUser(Long id);

    User findUserByEmail(String email);
}