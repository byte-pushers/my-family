package com.bytepushers.family.dao;

import com.bytepushers.family.model.User;

public interface UserDAO {
    User findByEmail(String email);

    // TODO CRUD declarations
    User create(User user);
//    User (Integer id);
    Integer update(User user);
    Integer delete(User user);


}
