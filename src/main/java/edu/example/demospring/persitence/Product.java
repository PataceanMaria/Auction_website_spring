package edu.example.demospring.persitence;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "product_auction")
public class Product implements Serializable {
    private long id;
    private String name;
    private  String price;
    private String description;
    @Lob
    private byte[] image;


    public Product(byte[] image) {
        this.image = image;
    }

    public Product(long id, String name, String description, String price) {
        this.id=id;
        this.price = price;
        this.description = description;
        this.name = name;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Product() {

    }


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name= name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
