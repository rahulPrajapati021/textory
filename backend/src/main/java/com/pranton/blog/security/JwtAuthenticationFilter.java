package com.pranton.blog.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.pranton.blog.services.AuthenticationService;

import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthenticationService authenticationService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException, MalformedJwtException {
        // TODO Auto-generated method stub

        try {

            String token = extractToken(request);
            System.out.println(token);
            if (token != null) {
                UserDetails validatedUser = authenticationService.validateToken(token);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        validatedUser, null, validatedUser.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);

                if (validatedUser instanceof BlogUserDetails) {
                    request.setAttribute("userId", ((BlogUserDetails) validatedUser).getId());
                }
            }

        } catch (Exception e) {
            // TODO: handle exception
            // don't throw exception just move on 
            log.warn("invalid bearer token provided");
            throw new MalformedJwtException("Invalid jwt token");
        }
        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        System.out.println(bearerToken);
        if (bearerToken != null && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
