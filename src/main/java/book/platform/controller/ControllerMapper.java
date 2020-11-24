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

    @RequestMapping(value = "/book")
    public String getAddBook() {
        return "book";
    }

    @RequestMapping(value = "/edit")
    public String getEditBook() {
        return "edit";
    }
}
