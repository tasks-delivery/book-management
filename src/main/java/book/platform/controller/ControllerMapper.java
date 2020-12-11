package book.platform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ControllerMapper {

    @RequestMapping(value = "/")
    public String getLogin() {
        return "index";
    }

    @RequestMapping(value = "/search")
    public String getBook() {
        return "search";
    }

    @RequestMapping(value = "/contact")
    public String getContact() {
        return "contact";
    }

    @RequestMapping(value = "/about")
    public String getAbout() {
        return "about";
    }

    @RequestMapping(value = "/book")
    public String getAddBook() {
        return "book";
    }

    @RequestMapping(value = "/registration")
    public String getRegistration() {
        return "registration";
    }

    @RequestMapping(value = "/edit")
    public String getEditBook() {
        return "edit";
    }
}
