package book.platform.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String name;

    @Column
    @JsonProperty("categories")
    @ElementCollection(targetClass=String.class)
    private List<String> categories;

    @ManyToOne(optional=false, cascade= CascadeType.ALL)
    @JoinColumn(name = "user")
    private User user;
}
