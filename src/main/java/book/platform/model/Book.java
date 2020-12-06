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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "book")
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long bookId;

    private String name;

    @Column
    @JsonProperty("categories")
    @ElementCollection(targetClass=String.class)
    private List<String> categories;

    @ManyToOne (optional=false, cascade=CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(cascade=CascadeType.ALL)
    @Column
    @JsonProperty("authors")
    @ElementCollection(targetClass=Author.class)
    private List<Author> authors;

    private boolean available;

    public Book(String name, List<String> categories, User user){
        this.name = name;
        this.categories = categories;
        this.user = user;
    }
}
