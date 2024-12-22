package com.bytepushers.family.dao;

import com.bytepushers.family.model.User;

import java.util.List;

/**
 * DAO interface for managing user data.
 * Provides standard CRUD operations and additional methods for user retrieval by email.
 *
 * Implementations of this interface handle the persistence and retrieval logic for the User entity.
 *
 * @author Danny Amezquita
 * @version 1.0
 */
public interface UserDAO {

    /**
     * Creates a new user.
     *
     * @param user The User object to be created.
     * @return The created User object with a generated ID.
     */
    User createUser(User user);

    /**
     * Finds a user by their unique ID.
     *
     * @param id The ID of the user to be retrieved.
     * @return The User object matching the given ID.
     */
    User findUserById(Long id);

    /**
     * Retrieves all users in the system.
     *
     * @return A list of all User objects.
     */
    List<User> findAllUsers();

    /**
     * Updates an existing user's information.
     *
     * @param user The User object with updated information.
     * @return The updated User object.
     */
    User updateUser(User user);

    /**
     * Deletes a user by their unique ID.
     *
     * @param id The ID of the user to be deleted.
     * @return True if the user was successfully deleted, false otherwise.
     */
    boolean deleteUser(Long id);

    /**
     * Finds a user by their email address.
     *
     * @param email The email address of the user to be retrieved.
     * @return The User object matching the given email, or null if not found.
     */
    User findUserByEmail(String email);
}