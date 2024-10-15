package com.bytepushers.family.dao;

import com.bytepushers.family.model.User;

import java.util.List;

//@Repository
public interface UserDAO {

    // Standard CRUD operations
    User createUser(User user);
    User findUserById(Integer id);
    List<User> findAllUsers();
    void updateUser(User user);
    void deleteUser(Integer id);

    User findUserByEmail(String email);
}