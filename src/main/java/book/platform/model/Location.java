package book.platform.model;

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
public class Location {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String variety;

    private String number;

    @OneToOne(optional=false, mappedBy="location")
    @JsonIgnore
    private Book book;

    public Location(String variety, String number){
        this.variety = variety;
        this.number = number;
    }

}
