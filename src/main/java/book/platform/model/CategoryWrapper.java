package book.platform.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CategoryWrapper {

    @Column
    @JsonProperty("categories")
    @ElementCollection(targetClass=String.class)
    List<String> categories;

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

}
