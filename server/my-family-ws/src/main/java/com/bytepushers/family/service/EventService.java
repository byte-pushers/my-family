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
    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElseThrow(()-> new NotFoundException("Event not found with id " + id));
    }

    //get Event by event name
    public List<Event> getEventByName(String eventName) {
        List<Event>Events =  eventRepository.findByEventName(eventName);
        System.out.println("bug here");
        if(Events.isEmpty()){
            throw new NotFoundException("Event not found with name " + eventName);
        }
        return Events;
    }

    //delete event by id
    public String deleteEventById(Long id) {
        eventRepository.findById(id).ifPresent(eventRepository::delete);
        return "Event deleted successfully";
    }

    //update Event
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
        }else{
            throw new Exception("Event Not found");

        }

    }
}
