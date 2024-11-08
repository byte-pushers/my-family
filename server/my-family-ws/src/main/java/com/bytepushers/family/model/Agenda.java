package com.bytepushers.family.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

@Embeddable
public class Agenda {

    @NotNull(message = "Agenda can not be empty")
    @Column(nullable = false)
    private String agenda;

    @NotNull(message = "Start time can not be empty")
    @Column(nullable = false)
    private LocalTime startTime;

    @NotNull(message = "End time can not be empty")
    @Column(nullable = false)
    private LocalTime endTime;

    private LocalDate date;

    public Agenda() {
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Agenda agenda1 = (Agenda) o;
        return Objects.equals(agenda, agenda1.agenda) && Objects.equals(startTime, agenda1.startTime) && Objects.equals(endTime, agenda1.endTime) && Objects.equals(date, agenda1.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(agenda, startTime, endTime, date);
    }
}
