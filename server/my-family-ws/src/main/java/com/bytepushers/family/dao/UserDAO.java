package com.bytepushers.family.dao;

import com.bytepushers.family.model.User;

import java.util.List;

//@Repository
public interface UserDAO {

    // Standard CRUD operations
    User createUser(User user);
    User findUserById(Integer id);
    List<User> findAllUsers();
    User updateUser(User user);
    boolean deleteUser(Integer id);

    User findUserByEmail(String email);
}