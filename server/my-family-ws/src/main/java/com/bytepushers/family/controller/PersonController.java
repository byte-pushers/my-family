package com.bytepushers.family.controller;

import com.bytepushers.family.api.PersonRequestPayload;
import com.bytepushers.family.model.Person;
import com.bytepushers.family.service.PersonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PersonController {
    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PutMapping(value = "/persons", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Person> createFamilyTree(@Valid @RequestBody PersonRequestPayload payload) {
        Person person = personService.updatePerson(payload.getPerson());
        return new ResponseEntity<>(person, HttpStatus.CREATED);
    }
}
