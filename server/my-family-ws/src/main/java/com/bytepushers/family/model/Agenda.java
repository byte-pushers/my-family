package com.bytepushers.family.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

/**
 * The {@code Agenda} class represents an agenda item, including its description,
 * start and end times, and the associated date. This class is designed to be
 * embedded in other entities using the {@code @Embeddable} annotation.
 *
 * <p>The {@code Agenda} class enforces validation constraints to ensure all
 * required fields, such as agenda description, start time, and end time, are
 * provided and not null.</p>
 *
 * <p>Fields:
 * <ul>
 *   <li>{@code agenda} - A description of the agenda item (e.g., meeting topic).</li>
 *   <li>{@code startTime} - The starting time for the agenda item.</li>
 *   <li>{@code endTime} - The ending time for the agenda item.</li>
 *   <li>{@code date} - The date associated with the agenda item (optional).</li>
 * </ul>
 * </p>
 */
@Embeddable
public class Agenda {

    /**
     * A description of the agenda item. Cannot be null or empty.
     */
    @NotNull(message = "Agenda can not be empty")
    @Column(nullable = false)
    private String agenda;

    /**
     * The starting time of the agenda item. Cannot be null or empty.
     */
    @NotNull(message = "Start time can not be empty")
    @Column(nullable = false)
    private LocalTime startTime;

    /**
     * The ending time of the agenda item. Cannot be null or empty.
     */
    @NotNull(message = "End time can not be empty")
    @Column(nullable = false)
    private LocalTime endTime;

    /**
     * The date associated with the agenda item. Optional field.
     */
    private LocalDate date;

    /**
     * Default constructor for JPA.
     */
    public Agenda() {
    }

    /**
     * Constructs an {@code Agenda} object with the specified details.
     *
     * @param agenda    the description of the agenda item.
     * @param startTime the starting time of the agenda item.
     * @param endTime   the ending time of the agenda item.
     * @param date      the date associated with the agenda item.
     */
    public Agenda(String agenda, LocalTime startTime, LocalTime endTime, LocalDate date) {
        this.agenda = agenda;
        this.startTime = startTime;
        this.endTime = endTime;
        this.date = date;
    }

    public String getAgenda() {
        return agenda;
    }

    public void setAgenda(String agenda) {
        this.agenda = agenda;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    /**
     * Checks if two {@code Agenda} objects are equal based on their fields.
     *
     * @param o the object to compare with.
     * @return true if the objects are equal; false otherwise.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Agenda agenda1 = (Agenda) o;
        return Objects.equals(agenda, agenda1.agenda) && Objects.equals(startTime, agenda1.startTime) && Objects.equals(endTime, agenda1.endTime) && Objects.equals(date, agenda1.date);
    }

    /**
     * Generates the hash code for the {@code Agenda} object.
     *
     * @return the hash code of the {@code Agenda} object.
     */
    @Override
    public int hashCode() {
        return Objects.hash(agenda, startTime, endTime, date);
    }
}
