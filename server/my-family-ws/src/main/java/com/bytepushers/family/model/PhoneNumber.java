package com.bytepushers.family.model;

public class PhoneNumber {
    private String phoneType;
    private String countryCode;
    private String areaCode;
    private String subscriberNumber;

    public PhoneNumber(String phoneType, String countryCode, String areaCode, String subscriberNumber) {
        this.phoneType = phoneType;
        this.countryCode = countryCode;
        this.areaCode = areaCode;
        this.subscriberNumber = subscriberNumber;
    }

    public String getPhoneType() {
        return phoneType;
    }

    public void setPhoneType(String phoneType) {
        this.phoneType = phoneType;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getSubscriberNumber() {
        return subscriberNumber;
    }

    public void setSubscriberNumber(String subscriberNumber) {
        this.subscriberNumber = subscriberNumber;
    }

    @Override
    public String toString() {
        return "PhoneNumber{" +
                "phoneType='" + phoneType + '\'' +
                ", countryCode='" + countryCode + '\'' +
                ", areaCode='" + areaCode + '\'' +
                ", subscriberNumber='" + subscriberNumber + '\'' +
                '}';
    }
}