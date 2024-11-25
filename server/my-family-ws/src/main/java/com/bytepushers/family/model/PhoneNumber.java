package com.bytepushers.family.model;

/**
 * Represents a phone number entity in the system.
 * This class stores details about a phone number, including its type, country code, area code,
 * and subscriber number. It extends {@link BaseIdGeneratedValueEntity} to include common entity fields.
 */
public class PhoneNumber extends BaseIdGeneratedValueEntity {

    /** The type of the phone number (e.g., Mobile, Home, Work). */
    private String phoneType;

    /** The country code of the phone number (e.g., +1 for the United States). */
    private String countryCode;

    /** The area code of the phone number. */
    private String areaCode;

    /** The subscriber number of the phone number. */
    private String subscriberNumber;

    /**
     * Constructs a PhoneNumber with the specified details.
     *
     * @param phoneType        the type of the phone number (e.g., Mobile, Home, Work)
     * @param countryCode      the country code of the phone number
     * @param areaCode         the area code of the phone number
     * @param subscriberNumber the subscriber number of the phone number
     */
    public PhoneNumber(String phoneType, String countryCode, String areaCode, String subscriberNumber) {
        this.phoneType = phoneType;
        this.countryCode = countryCode;
        this.areaCode = areaCode;
        this.subscriberNumber = subscriberNumber;
    }

    /**
     * Retrieves the type of the phone number.
     *
     * @return the phone type
     */
    public String getPhoneType() {
        return phoneType;
    }

    /**
     * Sets the type of the phone number.
     *
     * @param phoneType the phone type to set
     */
    public void setPhoneType(String phoneType) {
        this.phoneType = phoneType;
    }

    /**
     * Retrieves the country code of the phone number.
     *
     * @return the country code
     */
    public String getCountryCode() {
        return countryCode;
    }

    /**
     * Sets the country code of the phone number.
     *
     * @param countryCode the country code to set
     */
    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    /**
     * Retrieves the area code of the phone number.
     *
     * @return the area code
     */
    public String getAreaCode() {
        return areaCode;
    }

    /**
     * Sets the area code of the phone number.
     *
     * @param areaCode the area code to set
     */
    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    /**
     * Retrieves the subscriber number of the phone number.
     *
     * @return the subscriber number
     */
    public String getSubscriberNumber() {
        return subscriberNumber;
    }

    /**
     * Sets the subscriber number of the phone number.
     *
     * @param subscriberNumber the subscriber number to set
     */
    public void setSubscriberNumber(String subscriberNumber) {
        this.subscriberNumber = subscriberNumber;
    }

    /**
     * Returns a string representation of this PhoneNumber.
     *
     * @return a string containing the phone number details
     */
    @Override
    public String toString() {
        return "PhoneNumber{" +
                super.toString() +
                ", phoneType='" + phoneType + '\'' +
                ", countryCode='" + countryCode + '\'' +
                ", areaCode='" + areaCode + '\'' +
                ", subscriberNumber='" + subscriberNumber + '\'' +
                '}';
    }
}
