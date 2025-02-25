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

/**
 * REST controller for managing events in the application. This controller provides endpoints for creating, retrieving, updating,
 * and deleting event data. The API supports various CRUD operations related to events.
 * <p>
 * The controller exposes APIs for:
 * - Creating a new event
 * - Retrieving all events or a specific event by ID or name
 * - Updating an existing event
 * - Deleting an event by ID
 * </p>
 *
 * @author Adish Timalsina
 */
@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins="*")
public class EventController {

    private final EventService eventService;
    private final EventRepository eventRepository;

    /**
     * Constructs an instance of {@link EventController} with the specified {@link EventService} and {@link EventRepository}.
     *
     * @param eventService the service responsible for event-related business logic
     * @param eventRepository the repository responsible for interacting with the event database
     */
    public EventController(EventService eventService, EventRepository eventRepository) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
    }

    /**
     * Creates a new event with the provided event details.
     *
     * @param event the event details to be created
     * @param bindingResult holds any validation errors during the request
     * @return a {@link ResponseEntity} containing the created event and a status of {@link HttpStatus#CREATED}
     */
    @PostMapping(value = "/events", consumes = {"application/json"}, produces = {"application/json"})
    public ResponseEntity<?> createEvent(@Valid @RequestBody Event event, BindingResult bindingResult) {
        List<Event> events = new ArrayList<>();
        Event createdEvent = eventService.createEvent(event);
        events.add(createdEvent);
        return new ResponseEntity<>(events, HttpStatus.CREATED);
    }

    /**
     * Retrieves a list of all events.
     *
     * @return a {@link ResponseEntity} containing a list of all events and a status of {@link HttpStatus#OK}
     */
    @GetMapping(value = "/events", produces = {"application/json"})
    public ResponseEntity<?> getEvents() {
        List<Event> events = eventService.getEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    /**
     * Retrieves a specific event by its ID.
     *
     * @param id the ID of the event to retrieve
     * @return a {@link ResponseEntity} containing the event and a status of {@link HttpStatus#OK}
     */
    @GetMapping(value = "/events/{id}", produces = {"application/json"})
    public ResponseEntity<?> getEvent(@PathVariable Long id) {
        List<Event> events = new ArrayList<>();
        Event event = eventService.getEventById(id);
        events.add(event);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    /**
     * Retrieves events based on an optional query parameter (event name).
     *
     * @param name the name of the event to search for (optional)
     * @return a {@link ResponseEntity} containing the matching events and a status of {@link HttpStatus#OK},
     *         or an error response if no name is provided
     */
    @GetMapping(value = "/events/", produces = {"application/json"})
    public ResponseEntity<?> getEventByName(@RequestParam(required = false) String name) {
        if (name != null) {
            List<Event> event = eventService.getEventByName(name);
            return new ResponseEntity<>(event, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ErrorResponse(APIErrorConstant.API_ERROR_SOURCE_NOT_FOUND,"Event name is required",null, null), HttpStatus.BAD_REQUEST);
        }

    }

    /**
     * Deletes an event by its ID.
     *
     * @param id the ID of the event to delete
     * @return a {@link ResponseEntity} containing a message indicating the event was deleted and a status of {@link HttpStatus#OK}
     */
    @DeleteMapping(value = "/events/{id}")
    public ResponseEntity<?> deleteEventById(@PathVariable Long id) {
       String event = eventService.deleteEventById(id);
      return new ResponseEntity<>(event, HttpStatus.OK);
    }

    /**
     * Updates an existing event with the provided event details.
     *
     * @param event the event details to update
     * @param id the ID of the event to be updated
     * @param bindingResult holds any validation errors during the request
     * @return a {@link ResponseEntity} containing the updated event and a status of {@link HttpStatus#OK}
     * @throws Exception if an error occurs during the event update process
     */
    @PatchMapping(value = "/events/{id}", consumes = {"application/json"}, produces = {"application/json"})
    public ResponseEntity<?> updateEvent(@Valid @RequestBody Event event, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        Event updatedEvent = eventService.updateEvent(event, id);
        return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
    }
}
