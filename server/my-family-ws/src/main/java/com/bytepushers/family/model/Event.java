package com.bytepushers.family.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

@Entity
public class Event {
    @Id
    @GeneratedValue
    private int id;

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
    @NotNull(message = "event start time is required")
    private LocalTime eventStartTime;

    @Column(nullable = false)
    @NotNull(message = "event end time is required")
    private LocalTime eventEndTime;

    @Column(nullable = false)
    @NotBlank(message = "address is required")
    private String address;

    @Column(nullable = false)
    @NotBlank(message = "agenda is required")
    private String agenda;

    public Event() {
    }

    public Event(int id, String eventType, String eventName, LocalDate eventStartDate, LocalDate eventEndDate, LocalTime eventStartTime, LocalTime eventEndTime, String address, String agenda) {
        this.id = id;
        this.eventType = eventType;
        this.eventName = eventName;
        this.eventStartDate = eventStartDate;
        this.eventEndDate = eventEndDate;
        this.eventStartTime = eventStartTime;
        this.eventEndTime = eventEndTime;
        this.address = address;
        this.agenda = agenda;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public LocalTime getEventStartTime() {
        return eventStartTime;
    }

    public void setEventStartTime(LocalTime eventStartTime) {
        this.eventStartTime = eventStartTime;
    }

    public LocalTime getEventEndTime() {
        return eventEndTime;
    }

    public void setEventEndTime(LocalTime eventEndTime) {
        this.eventEndTime = eventEndTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAgenda() {
        return agenda;
    }

    public void setAgenda(String agenda) {
        this.agenda = agenda;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id) && Objects.equals(eventType, event.eventType) && Objects.equals(eventName, event.eventName) && Objects.equals(eventStartDate, event.eventStartDate) && Objects.equals(eventEndDate, event.eventEndDate) && Objects.equals(eventStartTime, event.eventStartTime) && Objects.equals(eventEndTime, event.eventEndTime) && Objects.equals(address, event.address) && Objects.equals(agenda, event.agenda);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, eventType, eventName, eventStartDate, eventEndDate, eventStartTime, eventEndTime, address, agenda);
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", eventType='" + eventType + '\'' +
                ", eventName='" + eventName + '\'' +
                ", eventStartDate=" + eventStartDate +
                ", eventEndDate=" + eventEndDate +
                ", eventStartTime=" + eventStartTime +
                ", eventEndTime=" + eventEndTime +
                ", address='" + address + '\'' +
                ", agenda='" + agenda + '\'' +
                '}';
    }
}
