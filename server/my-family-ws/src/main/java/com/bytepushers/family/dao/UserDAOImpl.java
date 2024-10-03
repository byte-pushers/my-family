package com.bytepushers.family.dao;

import com.bytepushers.family.model.User;
import com.bytepushers.family.model.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAOImpl implements UserDAO {

    private final UserRepo userRepo;

    @Autowired
    public UserDAOImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }
}