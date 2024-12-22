package com.bytepushers.family.repo;

import com.bytepushers.family.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
