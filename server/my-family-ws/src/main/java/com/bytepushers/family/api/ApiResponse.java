package com.bytepushers.family.api;

import java.util.ArrayList;
import java.util.List;

public class ApiResponse <T> {

    private List<T> data;

    public ApiResponse() {
        this.data = new ArrayList<>();
    }

    // Constructor for single object
    public ApiResponse(T singleObject) {
        this.data = new ArrayList<>();
        this.data.add(singleObject);
    }

    // Getter method to ensure it's always a list
    public List<T> getData() {
        return data;
    }

    // Setter for a single object
    public void setData(T singleObject) {
        this.data = new ArrayList<>();
        this.data.add(singleObject);
    }

}
//package com.bytepushers.family.api;
//
//import com.bytepushers.family.model.FamilyMember;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class ApiResponse {
//
//    private List<FamilyMember> data;
//
//    public ApiResponse() {
//    }
//
//    public ApiResponse(List<FamilyMember> data) {
//        this.data = data;
//    }
//
//    public List<FamilyMember> getData() {
//        return data;
//    }
//
//    public void setData(List<FamilyMember> data) {
//        this.data = data;
//    }
//
//    // New method to get the specific formatted response
//    public List<Object> getFormattedResponse() {
//        return data.stream()
//                .map(this::convertToFormattedResponse)
//                .collect(Collectors.toList());
//    }
//
//    // Convert FamilyMember to the desired format
//    private Object convertToFormattedResponse(FamilyMember familyMember) {
//        // Create a new response map
//        List<Object> response = new ArrayList<>();
//
//        // Build the formatted structure
//        response.add(new FormattedFamilyMember(
//                familyMember.getRelationship(),
//                new FormattedPerson(familyMember.getFamilyMembers().stream()
//                        .map(this::convertToFormattedResponse)
//                        .collect(Collectors.toList())
//                )
//        ));
//
//        return response;
//    }
//
//    // Inner classes to represent the desired structure
//    private static class FormattedFamilyMember {
//        private String relationship;
//        private FormattedPerson person;
//
//        public FormattedFamilyMember(String relationship, FormattedPerson person) {
//            this.relationship = relationship;
//            this.person = person;
//        }
//
//        public String getRelationship() {
//            return relationship;
//        }
//
//        public void setRelationship(String relationship) {
//            this.relationship = relationship;
//        }
//
//        public FormattedPerson getPerson() {
//            return person;
//        }
//
//        public void setPerson(FormattedPerson person) {
//            this.person = person;
//        }
//    }
//
//    private static class FormattedPerson {
//        private List<Object> familyMembers;
//
//        public FormattedPerson(List<Object> familyMembers) {
//            this.familyMembers = familyMembers;
//        }
//
//        public List<Object> getFamilyMembers() {
//            return familyMembers;
//        }
//
//        public void setFamilyMembers(List<Object> familyMembers) {
//            this.familyMembers = familyMembers;
//        }
//    }
//}
