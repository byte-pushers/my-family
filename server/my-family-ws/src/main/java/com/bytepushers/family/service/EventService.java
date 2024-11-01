package com.bytepushers.family.service;

import com.bytepushers.family.model.Event;
import com.bytepushers.family.repo.EventRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
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
            existingEvent.setEventStartTime(event.getEventStartTime());
            existingEvent.setEventEndTime(event.getEventEndTime());
            existingEvent.setAddress(event.getAddress());
            existingEvent.setAgenda(event.getAgenda());
            return eventRepository.save(existingEvent);
        }else{
            throw new Exception("Event Not found");

        }

    }
}
