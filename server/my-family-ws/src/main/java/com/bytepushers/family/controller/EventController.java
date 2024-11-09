package com.bytepushers.family.controller;

import com.bytepushers.family.api.ApiResponse;
import com.bytepushers.family.model.Event;
import com.bytepushers.family.repo.EventRepository;
import com.bytepushers.family.service.EventService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api", consumes = "application/json")
@CrossOrigin(origins="*")
public class EventController {

    private final EventService eventService;
    private final EventRepository eventRepository;

    public EventController(EventService eventService, EventRepository eventRepository) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
    }

    @PostMapping(value = "/create-event")
    public ResponseEntity<?> createEvent(@Valid @RequestBody Event event, BindingResult bindingResult) {

        Event createdEvent = eventService.createEvent(event);

        ApiResponse<Event> response = new ApiResponse<>(createdEvent);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping(value = "/events", consumes = {"*/*"})
    public ResponseEntity<?> getEvents() {

        List<Event> events = eventService.getEvents();

        ApiResponse<List<Event>> response = new ApiResponse<>(events);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/event/id/{id}", consumes = {"*/*"})
    public ResponseEntity<?> getEvent(@PathVariable int id) {

        Event event = eventService.getEventById(id);
        ApiResponse<Event> response = new ApiResponse<>(event);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/event/name/{name}", consumes = {"*/*"})
    public ResponseEntity<?> getEventByName(@PathVariable String name) {

        List<Event> event = eventService.getEventByName(name);
        ApiResponse<List<Event>> response = new ApiResponse<>(event);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/event/delete/{id}",consumes = {"*/*"})
    public ResponseEntity<?> deleteEventById(@PathVariable int id) {

       String event = eventService.deleteEventById(id);
      return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @PutMapping(value = "/event/update/{id}")
    public ResponseEntity<?> updateEvent(@Valid @RequestBody Event event, @PathVariable int id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        Event updatedEvent = eventService.updateEvent(event, id);
        return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
    }
}
