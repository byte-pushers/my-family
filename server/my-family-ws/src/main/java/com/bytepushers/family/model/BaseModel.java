package com.bytepushers.family.model;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

import java.util.Date;
import java.util.Objects;

/**
 * Represents a base model class for common entity attributes.
 * This class provides fields and methods for tracking the creation and update metadata of an entity.
 * It is intended to be extended by other entity classes using {@link MappedSuperclass}.
 */
@MappedSuperclass
public abstract class BaseModel {

    /** The username of the creator of the entity. */
    @Column(name = "created_by")
    protected String createdBy;

    /** The username of the last person to update the entity. */
    @Column(name = "updated_by")
    protected String updatedBy;

    /** The timestamp when the entity was created. */
    @Column(name = "created_date")
    protected Date createdDate;

    /** The timestamp when the entity was last updated. */
    @Column(name = "updated_date")
    protected Date updatedDate;

    /**
     * Default constructor for BaseModel.
     * Required for frameworks like JPA to instantiate objects.
     */
    public BaseModel() {
    }

    /**
     * Constructs a BaseModel with specified metadata.
     *
     * @param createdBy    the username of the entity creator
     * @param updatedBy    the username of the last updater
     * @param createdDate  the timestamp when the entity was created
     * @param updatedDate  the timestamp when the entity was last updated
     */
    public BaseModel(String createdBy, Date createdDate, String updatedBy, Date updatedDate) {
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    /**
     * Retrieves the username of the creator of the entity.
     *
     * @return the creator's username
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * Sets the username of the creator of the entity.
     *
     * @param createdBy the creator's username
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * Retrieves the username of the last updater of the entity.
     *
     * @return the last updater's username
     */
    public String getUpdatedBy() {
        return updatedBy;
    }

    /**
     * Sets the username of the last updater of the entity.
     *
     * @param updatedBy the last updater's username
     */
    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    /**
     * Retrieves the creation timestamp of the entity.
     *
     * @return the timestamp of creation
     */
    public Date getCreatedDate() {
        return createdDate;
    }

    /**
     * Sets the creation timestamp of the entity.
     *
     * @param createdDate the timestamp of creation
     */
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * Retrieves the last updated timestamp of the entity.
     *
     * @return the timestamp of the last update
     */
    public Date getUpdatedDate() {
        return updatedDate;
    }

    /**
     * Sets the last updated timestamp of the entity.
     *
     * @param updatedDate the timestamp of the last update
     */
    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    /**
     * Returns a string representation of the BaseModel.
     * Includes the creation and update metadata.
     *
     * @return a string containing metadata details
     */
    @Override
    public String toString() {
        return ", createdBy='" + createdBy + '\'' +
                ", updatedBy='" + updatedBy + '\'' +
                ", createdDate=" + createdDate +
                ", updatedDate=" + updatedDate;
    }

    /**
     * Compares this BaseModel to another object for equality.
     * Two BaseModel instances are considered equal if all metadata fields are the same.
     *
     * @param o the object to compare to
     * @return true if the objects are equal, false otherwise
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BaseModel that = (BaseModel) o;
        return Objects.equals(createdBy, that.createdBy) &&
                Objects.equals(updatedBy, that.updatedBy) &&
                Objects.equals(createdDate, that.createdDate) &&
                Objects.equals(updatedDate, that.updatedDate);
    }

    /**
     * Computes the hash code for this BaseModel.
     *
     * @return the hash code as an integer
     */
    @Override
    public int hashCode() {
        return Objects.hash(createdBy, updatedBy, createdDate, updatedDate);
    }
}
