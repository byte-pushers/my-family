package com.bytepushers.family.controller;

import com.bytepushers.family.api.APIErrorConstant;
import com.bytepushers.family.api.ErrorResponse;
import com.bytepushers.family.model.Event;
import com.bytepushers.family.repo.EventRepository;
import com.bytepushers.family.service.EventService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins="*")
public class EventController {

    private final EventService eventService;
    private final EventRepository eventRepository;

    public EventController(EventService eventService, EventRepository eventRepository) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
    }

    @PostMapping(value = "/events", consumes = {"application/json"}, produces = {"application/json"})
    public ResponseEntity<?> createEvent(@Valid @RequestBody Event event, BindingResult bindingResult) {
        List<Event> events = new ArrayList<>();
        Event createdEvent = eventService.createEvent(event);
        events.add(createdEvent);
        return new ResponseEntity<>(events, HttpStatus.CREATED);
    }

    @GetMapping(value = "/events", produces = {"application/json"})
    public ResponseEntity<?> getEvents() {
        List<Event> events = eventService.getEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping(value = "/events/{id}", produces = {"application/json"})
    public ResponseEntity<?> getEvent(@PathVariable Long id) {
        List<Event> events = new ArrayList<>();
        Event event = eventService.getEventById(id);
        events.add(event);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping(value = "/events/", produces = {"application/json"})
    public ResponseEntity<?> getEventByName(@RequestParam(required = false) String name) {
        if (name != null) {
            List<Event> event = eventService.getEventByName(name);
            return new ResponseEntity<>(event, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ErrorResponse(APIErrorConstant.API_ERROR_SOURCE_NOT_FOUND,"Event name is required",null, null), HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping(value = "/events/{id}")
    public ResponseEntity<?> deleteEventById(@PathVariable Long id) {
       String event = eventService.deleteEventById(id);
      return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @PatchMapping(value = "/events/{id}", consumes = {"application/json"}, produces = {"application/json"})
    public ResponseEntity<?> updateEvent(@Valid @RequestBody Event event, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        Event updatedEvent = eventService.updateEvent(event, id);
        return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
    }
}
