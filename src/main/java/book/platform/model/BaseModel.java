package book.platform.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import lombok.Data;

@Data
@MappedSuperclass
class BaseModel {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
}
