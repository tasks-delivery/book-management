package book.platform.model;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
public class Location extends BaseModel {

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
