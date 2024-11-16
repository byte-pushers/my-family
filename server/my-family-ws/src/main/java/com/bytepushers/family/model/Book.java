package com.bytepushers.family.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name = "book_id")
public class Book extends Merchandise{

    private String author;
    private String ISBN;

    public Book() {
        super();
    }

    public Book(Long id, MerchandiseType merchandiseType, String productName, float productPrice, String productDescription, String productImageUrl, String ISBN, String author) {
        super(id, merchandiseType, productName, productPrice, productDescription, productImageUrl);
        this.ISBN = ISBN;
        this.author = author;
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


