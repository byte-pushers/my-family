package com.bytepushers.family.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

import java.time.LocalDateTime;
import java.util.Objects;

@MappedSuperclass
public abstract class BaseIdGeneratedValueEntity extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    // Constructors
    public BaseIdGeneratedValueEntity() {
        super();
    }

    public BaseIdGeneratedValueEntity(Long id, String createdBy, String updatedBy, LocalDateTime createdDate, LocalDateTime updatedDate) {
        super(createdBy, updatedBy, createdDate, updatedDate);
        this.id = id;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "id=" + id + super.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseIdGeneratedValueEntity that = (BaseIdGeneratedValueEntity) o;
        return Objects.equals(id, that.id) && super.equals(o);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id) + super.hashCode();
    }
}