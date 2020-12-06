package book.platform.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Publisher {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Timestamp date;

    @OneToOne(optional=false, mappedBy="publisher")
    @JsonIgnore
    private Book book;

    public Publisher(String name, Timestamp date){
        this.name = name;
        this.date = date;
    }
}
