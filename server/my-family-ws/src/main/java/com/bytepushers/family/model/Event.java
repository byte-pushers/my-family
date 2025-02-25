package com.bytepushers.family.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;

/**
 * The {@code Event} class represents an event that is organized with specific details such as its type,
 * name, start and end dates, location, and associated agendas and merchandise.
 * This class is an entity, and it is stored in the database with various attributes and relationships.
 *
 * <p>Annotations:</p>
 * <ul>
 *   <li>{@code @Entity} - Marks this class as a JPA entity to be stored in the database.</li>
 *   <li>{@code @Id} - Specifies the primary key of the entity.</li>
 *   <li>{@code @GeneratedValue} - Automatically generates the primary key for the entity.</li>
 *   <li>{@code @Column} - Specifies that the fields are mapped to columns in the database.</li>
 *   <li>{@code @NotBlank} - Validates that the corresponding fields are not empty (used for non-nullable string attributes).</li>
 *   <li>{@code @NotNull} - Validates that the fields are not null (used for date and other non-nullable fields).</li>
 *   <li>{@code @ElementCollection} and {@code @CollectionTable} - Defines a collection of embeddable objects,
 *   such as agendas, to be persisted in a separate table.</li>
 *   <li>{@code @OneToMany} - Defines a one-to-many relationship with {@code Merchandise} entities.</li>
 * </ul>
 *
 * <p>Attributes:</p>
 * <ul>
 *   <li>{@code id} - The unique identifier for the event.</li>
 *   <li>{@code eventType} - The type/category of the event (e.g., conference, seminar, etc.).</li>
 *   <li>{@code eventName} - The name of the event.</li>
 *   <li>{@code eventStartDate} - The starting date of the event.</li>
 *   <li>{@code eventEndDate} - The ending date of the event.</li>
 *   <li>{@code address} - The location or address where the event will be held.</li>
 *   <li>{@code agendas} - A list of {@code Agenda} objects, each containing agenda details for the event.</li>
 *   <li>{@code merchandise} - A list of {@code Merchandise} objects associated with the event.</li>
 * </ul>
 *
 * <p>Methods:</p>
 * <ul>
 *   <li>Getter and setter methods for all attributes to access and modify event details.</li>
 *   <li>{@code equals(Object o)} - Compares two {@code Event} objects to check if they are equal based on their attributes.</li>
 *   <li>{@code hashCode()} - Generates a hash code for the {@code Event} object based on its attributes.</li>
 *   <li>{@code toString()} - Returns a string representation of the {@code Event} object, showing its key details.</li>
 * </ul>
 *
 * <p>Constructors:</p>
 * <ul>
 *   <li>Default constructor for JPA entity instantiation.</li>
 *   <li>Parameterized constructor for initializing an event with its details, including type, name, dates, and related objects.</li>
 * </ul>
 *
 * <p>Author: Adish Timalsina</p>
 */
@Entity
public class Event {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Type of event is required")
    private String eventType;

    @Column(nullable = false)
    @NotBlank(message = "event name is required")
    private String eventName;

    @Column(nullable = false)
    @NotNull(message = "event start date is required")
    private LocalDate eventStartDate;

    @Column(nullable = false)
    @NotNull(message = "event end date is required")
    private LocalDate eventEndDate;

    @Column(nullable = false)
    @NotBlank(message = "address is required")
    private String address;

    @ElementCollection
    @CollectionTable(name = "event_agenda", joinColumns = @JoinColumn(name = "fk_agenda_id"))
    private List<Agenda> agendas;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Merchandise> merchandise;

    /**
     * Default constructor for JPA.
     */
    public Event() {
    }

    /**
     * Constructs an {@code Event} object with the specified details.
     *
     * @param id            the unique identifier for the event.
     * @param eventType     the type/category of the event.
     * @param eventName     the name of the event.
     * @param eventStartDate the starting date of the event.
     * @param eventEndDate   the ending date of the event.
     * @param address        the location/address of the event.
     * @param agendas        the list of agendas for the event.
     * @param merchandise    the list of merchandise related to the event.
     */
    public Event(Long id, String eventType, String eventName, LocalDate eventStartDate, LocalDate eventEndDate, LocalTime eventStartTime, LocalTime eventEndTime, String address, List<Agenda> agendas, List<Merchandise> merchandise) {
        this.id = id;
        this.eventType = eventType;
        this.eventName = eventName;
        this.eventStartDate = eventStartDate;
        this.eventEndDate = eventEndDate;
        this.address = address;
        this.agendas = agendas;
        this.merchandise = merchandise;
    }

    public Long getId() {
        return id;
    }

    public void setMerchandise(List<Merchandise> merchandiseList) {
        this.merchandise = merchandiseList;
    }

    public List<Merchandise> getMerchandise() {
        return merchandise;
    }

    public List<Agenda> getAgendas() {
        return agendas;
    }

    public void setAgendas(List<Agenda> agenda) {
        this.agendas = agenda;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public LocalDate getEventStartDate() {
        return eventStartDate;
    }

    public void setEventStartDate(LocalDate eventStartDate) {
        this.eventStartDate = eventStartDate;
    }

    public LocalDate getEventEndDate() {
        return eventEndDate;
    }

    public void setEventEndDate(LocalDate eventEndDate) {
        this.eventEndDate = eventEndDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id) && Objects.equals(eventType, event.eventType) && Objects.equals(eventName, event.eventName) && Objects.equals(eventStartDate, event.eventStartDate) && Objects.equals(eventEndDate, event.eventEndDate) && Objects.equals(address, event.address) && Objects.equals(agendas, event.agendas);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, eventType, eventName, eventStartDate, eventEndDate, address, agendas);
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", eventType='" + eventType + '\'' +
                ", eventName='" + eventName + '\'' +
                ", eventStartDate=" + eventStartDate +
                ", eventEndDate=" + eventEndDate +
                ", address='" + address + '\'' +
                '}';
    }
}
