package com.bytepushers.family.repo;

import com.bytepushers.family.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * The {@code EventRepository} interface provides methods for accessing and
 * manipulating {@link Event} entities in the database. It extends {@link JpaRepository},
 * offering built-in functionality for CRUD operations on {@link Event} entities.
 * <p>In addition to the standard CRUD operations, this repository includes a
 * custom query method to find events by their {@code eventName}.</p>
 *
 * @see Event
 * @see JpaRepository
 *
 * @author Adish Timalsina
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    /**
     * Finds a list of {@link Event} entities based on the specified event name.
     *
     * @param eventName the name of the event to search for
     * @return a list of {@link Event} entities matching the provided event name
     */
    List<Event> findByEventName(String eventName);
}
