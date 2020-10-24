package book.platform.controller;

import book.platform.model.Book;
import book.platform.model.CategoryWrapper;
import book.platform.model.User;
import book.platform.repository.BookRepository;
import book.platform.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    /*
    Example: {"name":"test", "categories":["second", "first"], "firstName":"user1first", "lastName":"user1last"}
     */

    @PostMapping("/book")
    public ResponseEntity createBook(@RequestBody String name, CategoryWrapper categoryWrapper, String firstName, String lastName) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        userRepository.save(user);

        Book book = new Book();
        book.setName(name);
        book.setCategories(categoryWrapper.getCategories());
        book.setUser(user);
        bookRepository.save(book);

        return ResponseEntity.ok(HttpStatus.OK);
    }
}
