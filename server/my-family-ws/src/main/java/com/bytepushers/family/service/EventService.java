package com.bytepushers.family.service;

import com.bytepushers.family.exception.NotFoundException;
import com.bytepushers.family.model.Book;
import com.bytepushers.family.model.Event;
import com.bytepushers.family.model.Merchandise;
import com.bytepushers.family.model.Wearable;
import com.bytepushers.family.repo.EventRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The {@code EventService} class provides services for managing {@link Event} entities.
 * This service handles the business logic for creating, updating, retrieving, and deleting events.
 * It interacts with the {@link EventRepository} to perform CRUD operations on {@link Event} entities.
 *
 * <p>Services include:</p>
 * <ul>
 *   <li>Creating new events</li>
 *   <li>Retrieving events by ID or name</li>
 *   <li>Updating event details</li>
 *   <li>Deleting events by ID</li>
 * </ul>
 *
 * @author Adish Timalsina
 * @see Event
 * @see EventRepository
 */
@Service
public class EventService {

    private final EventRepository eventRepository;

    /**
     * Constructs a new {@code EventService} with the given {@code EventRepository}.
     *
     * @param eventRepository the repository to interact with {@link Event} entities
     */
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    /**
     * Creates a new event and saves it to the repository.
     *
     * @param event the event to be created
     * @return the created {@link Event}
     */
    public Event createEvent(@Valid Event event) {
        return eventRepository.save(event);
    }

    /**
     * Retrieves all events from the repository.
     *
     * @return a list of all {@link Event} entities
     */
    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    /**
     * Retrieves an event by its ID.
     *
     * @param id the ID of the event to retrieve
     * @return the {@link Event} entity with the given ID
     * @throws NotFoundException if no event with the given ID exists
     */
    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new NotFoundException("Event not found with id " + id));
    }

    /**
     * Retrieves a list of events by event name.
     *
     * @param eventName the event name to search for
     * @return a list of {@link Event} entities with the given name
     * @throws NotFoundException if no events with the given name exist
     */
    public List<Event> getEventByName(String eventName) {
        List<Event> Events = eventRepository.findByEventName(eventName);
        System.out.println("bug here");
        if (Events.isEmpty()) {
            throw new NotFoundException("Event not found with name " + eventName);
        }
        return Events;
    }

    /**
     * Deletes an event by its ID.
     *
     * @param id the ID of the event to be deleted
     * @return a confirmation message
     */
    public String deleteEventById(Long id) {
        eventRepository.findById(id).ifPresent(eventRepository::delete);
        return "Event deleted successfully";
    }

    /**
     * Updates an existing event with new information.
     *
     * @param event the event data to update
     * @param id    the ID of the event to be updated
     * @return the updated {@link Event}
     * @throws Exception if the event cannot be found or updated
     */
    public Event updateEvent(@Valid Event event, Long id) throws Exception {
        Event existingEvent = eventRepository.findById(id).orElseThrow(() -> new NotFoundException("Event not found"));
        if (existingEvent != null) {
            existingEvent.setEventType(event.getEventType());
            existingEvent.setEventName(event.getEventName());
            existingEvent.setEventStartDate(event.getEventStartDate());
            existingEvent.setEventEndDate(event.getEventEndDate());
            existingEvent.setAddress(event.getAddress());
            existingEvent.setAgendas(event.getAgendas());
            existingEvent.setMerchandise(event.getMerchandise());
            return eventRepository.save(existingEvent);
        } else {
            throw new Exception("Event Not found");

        }

    }
}
