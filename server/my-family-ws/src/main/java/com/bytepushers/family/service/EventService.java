package com.bytepushers.family.service;

import com.bytepushers.family.model.Book;
import com.bytepushers.family.model.Event;
import com.bytepushers.family.model.Merchandise;
import com.bytepushers.family.model.Wearable;
import com.bytepushers.family.repo.EventRepository;
import com.bytepushers.family.repo.MerchendiseRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final MerchendiseRepository merchendiseRepository;

    public EventService(EventRepository eventRepository, MerchendiseRepository merchendiseRepository) {
        this.eventRepository = eventRepository;
        this.merchendiseRepository = merchendiseRepository;
    }

    //create new event method
    public Event createEvent(@Valid Event event) {
        return eventRepository.save(event);
    }

    //get all events method
    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    //get event by id
    public Event getEventById(int id) {
        return eventRepository.findById(id).orElse(null);
    }

    //get Event by event name
    public List<Event> getEventByName(@Valid String eventName) {
        return eventRepository.findByEventName(eventName);
    }

    //delete event by id
    public String deleteEventById(int id) {
        eventRepository.findById(id).ifPresent(eventRepository::delete);
        return "Event deleted successfully";
    }

    //update Event
    public Event updateEvent(@Valid Event event, int id) throws Exception {
        Event existingEvent = eventRepository.findById(id).orElse(null);
        if (existingEvent != null) {
            existingEvent.setEventType(event.getEventType());
            existingEvent.setEventName(event.getEventName());
            existingEvent.setEventStartDate(event.getEventStartDate());
            existingEvent.setEventEndDate(event.getEventEndDate());
            existingEvent.setAddress(event.getAddress());
            return eventRepository.save(existingEvent);
        }else{
            throw new Exception("Event Not found");

        }

    }
}
