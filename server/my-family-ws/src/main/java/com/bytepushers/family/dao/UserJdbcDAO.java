package com.bytepushers.family.dao;

import com.bytepushers.family.exception.*;
import com.bytepushers.family.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Repository
public class UserJdbcDAO implements UserDAO {

    private static final Logger logger = LoggerFactory.getLogger(UserJdbcDAO.class);

    @Value("${spring.datasource.url}")
    private String jdbcUrl;
    @Value("${spring.datasource.username}")
    private String jdbcUsername;
    @Value("${spring.datasource.password}")
    private String jdbcPassword;

    private Connection getConnection() throws SQLException {
        try{
            return DriverManager.getConnection(jdbcUrl, jdbcUsername, jdbcPassword);
        } catch (SQLException e) {
            logger.error("Failed to establish database connection.", e);
            throw new DatabaseConnectionException("Unable to connect to the database.", e);
        }
    }

    // TODO: CRUD Happy Path, then Exceptions. Follow: Try, Catch, Finally. Make our own Application Exceptions
    @Override
    public User createUser(User someUser) {
        // Validate user data before proceeding
//        if (!isValidEmail(someUser.getEmail())) {
//            throw new InvalidUserException("Invalid email format." + someUser.getEmail());
//        }
//        if (someUser.getPassword().length() < 8) {
//            throw new InvalidUserException("Password must be at least 8 characters long.");
//        }

        Connection conn = null;
        User createdUser = null;
        String sql = "INSERT INTO users (email, password) VALUES (?, ?)";

        try {
            conn = getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, someUser.getEmail());
            stmt.setString(2, someUser.getPassword());
            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                createdUser = new User(someUser.getEmail(), someUser.getPassword()); // TODO: Create a findUserByID, pass in PK
                createdUser.setId(rs.getInt(1));  // Get the generated ID and set it
                logger.info("User created with id: {}", createdUser.getId());  // Happy path log
            }
        } catch (SQLException e) {
            if (e.getSQLState().equals("23505")) {  // Unique constraint violation
                logger.error("User creation failed: Duplicate email {}", someUser.getEmail(), e);
                throw new DuplicateUserException("A user with the email " + someUser.getEmail() + " already exists.");
            } else {
                logger.error("Error while creating User", e);
                throw new DatabaseOperationException("Error while creating user.", e);
            }
        } finally {
            if (conn != null){
                try {
                    conn.close();
                } catch (SQLException e) {
                    logger.error("Error while closing connection", e);
                }
            }
        }
        return createdUser;
    }

    @Override
    public User findUserById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                User foundUser = mapResultSetToUser(rs);
                logger.info("User found with id: {}", foundUser.getId());
                return mapResultSetToUser(rs);
            } else {
                throw new UserNotFoundException("User with id " + id + " not found.");
            }
        } catch (SQLException e) {
            logger.error("Error while finding User by id", e);
            throw new DatabaseOperationException("Error while finding User by id.", e);
        }
    }

    @Override
    public User findUserByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapResultSetToUser(rs);
            }
        } catch (SQLException e) {
            logger.error("Error finding user by email", e);
        }
        return null;
    }

    @Override
    public List<User> findAllUsers() {
        String sql = "SELECT * FROM users";
        List<User> users = new ArrayList<>();
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                users.add(mapResultSetToUser(rs));
            }
        } catch (SQLException e) {
            logger.error("Database operation failed", e);
            throw new DatabaseOperationException("Database error occurred during operation.", e);
        }
        return users;
    }

    @Override
    public void updateUser(User user) {
        String sql = "UPDATE users SET email = ?, password = ? WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, user.getEmail());
            stmt.setString(2, user.getPassword());
            stmt.setLong(3, user.getId());

            int rowsAffected = stmt.executeUpdate();
            if (rowsAffected > 0) {
                logger.info("User with id {} has been updated", user.getId());  // Happy path log
            } else {
                logger.warn("No user found with id {} to update", user.getId());
            }
        } catch (SQLException e) {
            logger.error("Database operation failed", e);
            throw new DatabaseOperationException("Database error occurred during operation.", e);
        }
    }

    @Override
    public void deleteUser(Long id) {
        String sql = "DELETE FROM users WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, id);

            int rowsAffected = stmt.executeUpdate();
            if(rowsAffected > 0) {
                logger.info("User with id {} has been deleted", id);
            } else {
//                logger.warn("No user found with id {} to delete", id);
                throw new UserNotFoundException("No such user found with id " + id);
            }
        } catch (SQLException e) {
            logger.error("Error while deleting user", e);
            throw new UserDeletionFailedException("Error while deleting user with id:" + id);
        }
    }

    // Helper method to map a ResultSet row to a User object
    private User mapResultSetToUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        return user;
    }
}