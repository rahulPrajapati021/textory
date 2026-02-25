package com.pranton.blog.services;

import org.springframework.security.core.userdetails.UserDetails;

import com.pranton.blog.security.BlogUserDetails;

public interface AuthenticationService {
    BlogUserDetails authenticate(String email, String password);
    String generateToken(UserDetails userDetails);
    BlogUserDetails validateToken(String token);
}
