package com.bytepushers.family.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;

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
    private List<Agenda> agenda;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
   // @JoinColumn(name = "event_id")
    private List<Merchandise> merchandiseList;

//    @OneToOne(cascade = CascadeType.ALL)
//   @JoinColumn(name = "package_id", referencedColumnName = "id")
//    private Package eventPackage;

    public Event() {
    }

    public Event(Long id, String eventType, String eventName, LocalDate eventStartDate, LocalDate eventEndDate, LocalTime eventStartTime, LocalTime eventEndTime, String address, List<Agenda> agenda, List<Merchandise> merchandiseList) {
        this.id = id;
        this.eventType = eventType;
        this.eventName = eventName;
        this.eventStartDate = eventStartDate;
        this.eventEndDate = eventEndDate;
        this.address = address;
        this.agenda = agenda;
        this.merchandiseList = merchandiseList;
    }

    public Long getId() {
        return id;
    }

    public void setMerchandiseList(List<Merchandise> merchandiseList) {
        this.merchandiseList = merchandiseList;
    }

    public List<Merchandise> getMerchandiseList() {
        return merchandiseList;
    }

    public List<Agenda> getAgenda() {
        return agenda;
    }

    public void setAgenda(List<Agenda> agenda) {
        this.agenda = agenda;
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
        return Objects.equals(id, event.id) && Objects.equals(eventType, event.eventType) && Objects.equals(eventName, event.eventName) && Objects.equals(eventStartDate, event.eventStartDate) && Objects.equals(eventEndDate, event.eventEndDate) && Objects.equals(address, event.address) && Objects.equals(agenda, event.agenda);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, eventType, eventName, eventStartDate, eventEndDate, address, agenda);
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
