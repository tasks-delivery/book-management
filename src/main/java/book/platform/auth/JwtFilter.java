package book.platform.auth;

import static java.util.stream.Collectors.toList;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import org.springframework.web.filter.GenericFilterBean;

public class JwtFilter extends GenericFilterBean {

    @Override
    public void doFilter(final ServletRequest req,
        final ServletResponse res,
        final FilterChain chain) throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest) req;

        final String token = Arrays.stream(request.getCookies())
            .filter(i -> i.getName().equals("Authorization")).collect(toList()).get(0).getValue();

        if (token == null) {
            throw new ServletException("Missing or invalid Authorization header.");
        }

        final Claims claims = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody();
        request.setAttribute("claims", claims);

        chain.doFilter(req, res);
    }

}
