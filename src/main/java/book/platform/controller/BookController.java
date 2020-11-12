package book.platform.controller;

import static java.util.stream.Collectors.toList;

import java.util.ArrayList;
import java.util.List;

import book.platform.constant.Category;
import book.platform.model.Book;
import book.platform.repository.BookRepository;
import book.platform.repository.UserRepository;
import book.platform.util.JsonUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/book")
    public ResponseEntity createBook(@RequestBody String body) {
        Book book = (Book)JsonUtil.jsonToObject(body, Book.class);
        Boolean duplicate = isDuplicate(book.getName(), book.getCategories());
        if (!duplicate){
            if (book.getUser().getFirstName().isEmpty() || book.getUser().getLastName().isEmpty()){
                book.setAvailable(true);
            }else {
                book.setAvailable(false);
            }

            if (categoryIsExists(book)){
                bookRepository.save(book);
                return ResponseEntity.ok(HttpStatus.OK);
            }else {
                return ResponseEntity.notFound().build();
            }

        }else {
            return ResponseEntity.badRequest()
                .body(String.format("Book with name %s and categories %s exist in the system", book.getName(), book.getCategories()));
        }
    }

    private Boolean categoryIsExists(Book book){
        List<String> categoryList = new ArrayList<>();
        categoryList.add(Category.DETECTIVE_FICTION);
        categoryList.add(Category.DICTIONARY);
        categoryList.add(Category.FANTASY);
        categoryList.add(Category.SCIENCE_FICTION);
        boolean isShown = true;
        for (String category : book.getCategories()){

            if (!categoryList.contains(category)){
                isShown = false;
                break;
            }

        }
        return isShown;
    }

    private Boolean isDuplicate(String name, List<String> categories){
        List<Book> books = convertBookToList(bookRepository.findAll()).parallelStream()
            .filter(i -> i.getCategories().containsAll(categories))
            .filter(i -> i.getName().equals(name))
            .collect(toList());
        return books.size() != 0;
    }

    private List<Book> convertBookToList(Iterable<Book> bookIterable){
        List<Book> books = new ArrayList<>();
        bookIterable.iterator().forEachRemaining(books::add);
        return books;
    }

    @GetMapping("/books")
    public Iterable<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("/books/{name}")
    public List<Book> getBooksByName(@RequestParam("categories") List<String> categories, @PathVariable String name) {
        List<Book> books = convertBookToList(bookRepository.findAll());
        if (!categories.isEmpty()){
            if (!categories.get(0).isEmpty()){
                books = books.stream()
                    .filter(i -> i.getCategories().containsAll(categories))
                    .collect(toList());
            }
        }

        if (!name.isEmpty()){
            books = books.stream()
                .filter(i -> i.getName().contains(name))
                .collect(toList());
        }

        return books;
    }

}