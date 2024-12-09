package com.bytepushers.family.config;

import com.bytepushers.family.model.Person;
import com.bytepushers.family.model.User;
import com.bytepushers.family.repo.PrivilegeRepository;
import com.bytepushers.family.repo.RoleRepository;
import com.bytepushers.family.repo.UserRepository;
import com.bytepushers.family.security.model.Privilege;
import com.bytepushers.family.security.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Component responsible for setting up initial data in the database.
 * <p>
 * This class listens for the {@link ContextRefreshedEvent} and sets up privileges, roles,
 * and a default admin user if they do not already exist in the database.
 * </p>
 *
 * @author Danny
 * @version 1.0
 */
@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    private boolean alreadySetup = false; // Tracks whether setup has already been performed

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Called when the application context is refreshed.
     * Sets up initial privileges, roles, and a default admin user.
     *
     * @param event The event triggered when the application context is refreshed.
     */
    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (alreadySetup) return; // Skip setup if already performed

        // Create default privileges
        Privilege readPrivilege = createPrivilegeIfNotFound("READ_PRIVILEGE");
        Privilege writePrivilege = createPrivilegeIfNotFound("WRITE_PRIVILEGE");

        // Create default roles
        List<Privilege> adminPrivileges = Arrays.asList(/*readPrivilege,*/ writePrivilege);
        createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
        createRoleIfNotFound("ROLE_USER", Arrays.asList(readPrivilege));

        // Create default admin user
        Optional<Role> adminRole = roleRepository.findByName("ROLE_ADMIN");
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPassword(passwordEncoder.encode("123456")); // Encrypt password
        user.setEmail("john@doe.com");
        user.setUsername("john@doe.com");
        user.setBirthDate(LocalDate.now()); // Assign current date as birth date
        user.setGender("male");

        // Link user and person entities
        Person person = user.getPerson();
        person.setUser(user);

        // Assign admin role to user if present
        if (adminRole.isPresent()) {
            user.setRoles(Arrays.asList(adminRole.get()));
        }

        user.setEnabled(true); // Enable the user account
        userRepository.save(user); // Save the user to the database

        alreadySetup = true; // Mark setup as complete
    }

    /**
     * Creates a privilege if it does not already exist.
     *
     * @param name The name of the privilege to create.
     * @return The created or existing {@link Privilege}.
     */
    @Transactional
    Privilege createPrivilegeIfNotFound(String name) {
        Privilege privilege = null;
        Optional<Privilege> existingPrivilege = privilegeRepository.findByName(name);

        if (existingPrivilege.isEmpty()) {
            privilege = new Privilege(name); // Create new privilege
            privilegeRepository.save(privilege); // Save privilege to database
        }

        return privilege;
    }

    /**
     * Creates a role with associated privileges if it does not already exist.
     *
     * @param name The name of the role to create.
     * @param privileges The privileges to associate with the role.
     * @return The created or existing {@link Role}.
     */
    @Transactional
    Role createRoleIfNotFound(String name, Collection<Privilege> privileges) {
        Role role = null;
        Optional<Role> existingRole = roleRepository.findByName(name);

        if (existingRole.isEmpty()) {
            role = new Role(name, privileges); // Create new role with privileges
            roleRepository.save(role); // Save role to database
        }

        return role;
    }
}
