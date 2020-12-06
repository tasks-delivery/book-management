package book.platform.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
public class Author extends BaseModel {

    private String firstName;

    private String lastName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    @JsonIgnore
    private Book book;

    public Author(String firstName, String lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}