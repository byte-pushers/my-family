package com.bytepushers.family.dao;

import com.bytepushers.family.model.User;

public interface UserDAO {
    User findByEmail(String email);
}
