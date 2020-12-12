package book.platform.repository;

import book.platform.model.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Long> {

    @Query("SELECT u FROM User u where u.login = :login")
    User findUserByLogin(@Param("login") String login);

}
