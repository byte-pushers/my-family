package com.bytepushers.family.service;

import com.bytepushers.family.model.Person;
import com.bytepushers.family.repo.PersonRepository;
import com.bytepushers.family.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonService {
    private final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Person updatePerson(Person person) {
        Person existingPerson = this.personRepository.findById(person.getId()).orElse(null);

        existingPerson.setId(person.getId());

        return this.personRepository.save(person);
    }
}
