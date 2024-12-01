package com.bytepushers.family.model;

import jakarta.persistence.*;

@Entity
public class Book extends Merchandise{

    private String author;
    private String ISBN;

    public Book(String type, String name, String description, double price, int quantity) {
        super(type, name, description, price, quantity);
    }

    public Book(String type, String name, String description, double price, int quantity, String author, String ISBN) {
        super(type, name, description, price, quantity);
        this.author = author;
        this.ISBN = ISBN;
    }

    public Book() {
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}


