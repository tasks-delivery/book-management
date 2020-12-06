package book.platform.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long userId;

    private String firstName;

    private String lastName;

    private String email;

    @OneToOne(optional=false, mappedBy="user")
    @JsonIgnore
    private Book book;

    public User(String firstName, String lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
