package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

/**
 * Represents a base entity with common fields that can be inherited by other entities.
 * This class includes common metadata such as ID, creation details, and update details.
 * It serves as a mapped superclass to be extended by specific entity classes.
 */
@MappedSuperclass
public abstract class BaseEntity {

    /** The unique identifier for the entity, automatically generated. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /** The username of the user who created the entity. */
    @Column(name = "created_by")
    private String createdBy;

    /** The username of the user who last updated the entity. */
    @Column(name = "updated_by")
    private String updatedBy;

    /** The date and time when the entity was created. */
    @Column(name = "created_date")
    private Date createdDate;

    /** The date and time when the entity was last updated. */
    @Column(name = "updated_date")
    private Date updatedDate;

    // Lifecycle Callbacks

    /**
     * Called before the entity is persisted for the first time.
     * Sets the `createdDate` and `updatedDate` to the current date,
     * and assigns a default value for the `createdBy` and `updatedBy` fields if they have not been explicitly set.
     */
    @PrePersist
    protected void onCreate() {
        Date now = new Date();
        this.createdDate = now;
        this.updatedDate = now; // Set updatedDate to match createdDate on initial creation
        if (this.createdBy == null) {
            this.createdBy = "defaultUser"; // Replace with actual logic to fetch the current user
        }
        this.updatedBy = this.createdBy; // Set updatedBy to match createdBy on initial creation
    }

    /**
     * Called before the entity is updated.
     * Sets the `updatedDate` to the current date and assigns a default value
     * for the `updatedBy` field if it has not been explicitly set.
     */
    @PreUpdate
    protected void onUpdate() {
        this.updatedDate = new Date(); // Update the timestamp
        if (this.updatedBy == null) {
            this.updatedBy = "defaultUser"; // Replace with actual logic to fetch the current user
        }
    }
    // Constructors

    /**
     * Constructs a BaseEntity with specified ID, createdBy, updatedBy, createdDate, and updatedDate.
     *
     * @param id           the unique identifier for the entity
     * @param createdBy    the username of the entity creator
     * @param updatedBy    the username of the last updater
     * @param createdDate  the date when the entity was created
     * @param updatedDate  the date when the entity was last updated
     */
    public BaseEntity(Integer id, String createdBy, String updatedBy, Date createdDate, Date updatedDate) {
        this.id = id;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    /**
     * Default constructor for BaseEntity.
     */
    public BaseEntity() {
    }

    // Getters and Setters

    /**
     * Gets the unique identifier for the entity.
     *
     * @return the entity ID
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets the unique identifier for the entity.
     *
     * @param id the ID to set
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets the username of the user who created the entity.
     *
     * @return the creator's username
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * Sets the username of the user who created the entity.
     *
     * @param createdBy the creator's username to set
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * Gets the username of the user who last updated the entity.
     *
     * @return the last updater's username
     */
    public String getUpdatedBy() {
        return updatedBy;
    }

    /**
     * Sets the username of the user who last updated the entity.
     *
     * @param updatedBy the last updater's username to set
     */
    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    /**
     * Gets the date and time when the entity was created.
     *
     * @return the creation date
     */
    public Date getCreatedDate() {
        return createdDate;
    }

    /**
     * Sets the date and time when the entity was created.
     *
     * @param createdDate the creation date to set
     */
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * Gets the date and time when the entity was last updated.
     *
     * @return the last update date
     */
    public Date getUpdatedDate() {
        return updatedDate;
    }

    /**
     * Sets the date and time when the entity was last updated.
     *
     * @param updatedDate the last update date to set
     */
    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    /**
     * Returns a string representation of this BaseEntity.
     *
     * @return a string containing the base entity details
     */
    @Override
    public String toString() {
        return "BaseEntity {" +
                "id=" + id +
                ", createdBy='" + createdBy + '\'' +
                ", updatedBy='" + updatedBy + '\'' +
                ", createdDate=" + createdDate +
                ", updatedDate=" + updatedDate +
                '}';
    }

    /**
     * Compares this BaseEntity to another object for equality.
     *
     * @param o the object to compare to
     * @return true if the objects are equal, false otherwise
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseEntity that = (BaseEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(createdBy, that.createdBy) &&
                Objects.equals(updatedBy, that.updatedBy) &&
                Objects.equals(createdDate, that.createdDate) &&
                Objects.equals(updatedDate, that.updatedDate);
    }

    /**
     * Computes the hash code for this BaseEntity.
     *
     * @return the hash code as an integer
     */
    @Override
    public int hashCode() {
        return Objects.hash(id, createdBy, updatedBy, createdDate, updatedDate);
    }
}
