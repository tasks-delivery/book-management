package book.platform.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "book")
@NoArgsConstructor
public class Book extends BaseModel {

    private String name;

    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name="book_id")
    private List<Category> categories;

    @OneToOne(optional=false, cascade=CascadeType.ALL)
    @JoinColumn (name="user_id")
    private User user;

    @OneToOne(optional=false, cascade=CascadeType.ALL)
    @JoinColumn (name="location_id")
    private Location location;

    @ManyToOne(optional=false, cascade=CascadeType.ALL)
    @JoinColumn(name = "publisher_id")
    private Publisher publisher;

    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name="book_id")
    private List<Author> authors;

    private boolean available;

    public Book(String name, List<Category> categories, User user){
        this.name = name;
        this.categories = categories;
        this.user = user;
    }
}
