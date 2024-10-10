package com.bytepushers.family.dao;

import com.bytepushers.family.model.User;
import com.bytepushers.family.GlobalErrorHandler.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDAOJpa implements UserDAO {

    @Autowired
    private UserRepo userRepo;

    @Override
    public User createUser(User user){
        return userRepo.save(user);
    }

    @Override
    public User findUserById(Long id) {
        // JPA provides a method to find by ID, which returns Optional
        return userRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found."));
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepo.findUserByEmail(email);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepo.findAll();  // JPA provides this out of the box
    }

    @Override
    public void updateUser(User user) {
        // Ensure the user exists before updating
        findUserById(user.getId());  // Will throw UserNotFoundException if not found
        userRepo.save(user);   // JPA handles both insert and update with save()
    }

    @Override
    public void deleteUser(Long id) {
        User user = findUserById(id);  // Ensure the user exists
        userRepo.delete(user);   // JPA handles deletion
    }
}
