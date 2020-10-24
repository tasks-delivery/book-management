package book.platform.repository;

import book.platform.model.Book;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

    @Query("SELECT b FROM Book b where b.name = :name")
    Book findBookByName(@Param("name") String name);
}
