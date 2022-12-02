package edu.example.demospring.persitence;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "students")
public class Product implements Serializable {
    private long id;
    private String Name;

    public Product() {
    }

    public Product(String Name) {
        this.Name = Name;
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
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }
}
