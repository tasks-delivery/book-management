package book.platform.controller;

import java.util.Date;

import javax.servlet.ServletException;

import book.platform.model.User;
import book.platform.repository.BookRepository;
import book.platform.repository.UserRepository;
import book.platform.util.JsonUtil;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @SuppressWarnings("unused")
    private static class LoginResponse {
        public String token;

        public LoginResponse(final String token) {
            this.token = token;
        }
    }

    @PostMapping("/registration")
    public ResponseEntity createUser(@RequestBody String body) {
        User user = (User) JsonUtil.jsonToObject(body, User.class);

        userRepository.save(user);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody String body) throws ServletException {
        User user = (User) JsonUtil.jsonToObject(body, User.class);

        User requestedUser = userRepository.findUserByLogin(user.getLogin());

        if (!user.getPassword().equals(requestedUser.getPassword())) {
            throw new ServletException("Invalid login");
        }else {
            return new LoginResponse(Jwts.builder().setSubject(user.getLogin())
                                         .claim("roles", "admin").setIssuedAt(new Date())
                                         .signWith(SignatureAlgorithm.HS256, "secretkey").compact());
        }

    }

}
