package book.platform.model;

import java.sql.Timestamp;

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
public class Publisher extends BaseModel {

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
