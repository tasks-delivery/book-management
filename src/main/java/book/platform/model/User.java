package book.platform.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String firstName;

    private String lastName;

  //  private List<Book> books;
}
