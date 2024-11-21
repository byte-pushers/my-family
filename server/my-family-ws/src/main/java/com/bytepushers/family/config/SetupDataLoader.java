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

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (alreadySetup) return;

        Privilege readPrivilege = createPrivilegeIfNotFound("READ_PRIVILEGE");
        Privilege writePrivilege = createPrivilegeIfNotFound("WRITE_PRIVILEGE");

        List<Privilege> adminPrivileges = Arrays.asList(/*readPrivilege,*/ writePrivilege);
        createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
        createRoleIfNotFound("ROLE_USER", Arrays.asList(readPrivilege));

        Optional<Role> adminRole = roleRepository.findByName("ROLE_USER");
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPassword(passwordEncoder.encode("123456"));
        user.setEmail("john@doe.com");
        user.setUsername("john@dow.com");
        user.setBirthDate(LocalDate.now());
        user.setGender("male");
        Person person = user.getPerson();
        person.setUser(user);

        if (adminRole.isPresent()) {
            user.setRoles(Arrays.asList(adminRole.get()));
        }

        user.setEnabled(true);
        userRepository.save(user);

        alreadySetup = true;
    }

    @Transactional
    Privilege createPrivilegeIfNotFound(String name) {
        Privilege privilege = null;
        Optional<Privilege> existingPrivilege = privilegeRepository.findByName(name);

        if (existingPrivilege.isEmpty()) {
            privilege = new Privilege(name);
            privilegeRepository.save(privilege);
        }

        return privilege;
    }

    @Transactional
    Role createRoleIfNotFound(String name, Collection<Privilege> privileges) {
        Role role = null;
        Optional<Role> existingRole = roleRepository.findByName(name);

        if (existingRole.isEmpty()) {
            role = new Role(name, privileges);
            roleRepository.save(role);
        }

        return role;
    }
}