package com.bytepushers.family.dao;

import com.bytepushers.family.api.InvalidEmailException;
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

    @Override
    public User create(User user) {
        return null;
    }

    @Override
    public Integer update(User user) {
        return 0;
    }

    @Override
    public Integer delete(User user) {
        return 0;
    }
}