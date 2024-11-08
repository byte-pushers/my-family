package com.bytepushers.family.repo;

import com.bytepushers.family.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByEventName(String eventName);
}
