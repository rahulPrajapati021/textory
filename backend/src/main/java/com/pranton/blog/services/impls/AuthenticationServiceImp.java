package com.pranton.blog.services.impls;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.pranton.blog.security.BlogUserDetails;
import com.pranton.blog.security.BlogUserDetailsService;
import com.pranton.blog.services.AuthenticationService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImp implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final BlogUserDetailsService userDetailsService;

    @Value("${jwt.secret}")
    private String secretKey;

    private final long jwtExpiry = 1000 * 60 * 60 * 2;

    @Override
    public BlogUserDetails authenticate(String email, String password) {
        // TODO Auto-generated method stub
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        return userDetailsService.loadUserByUsername(email);
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        // TODO Auto-generated method stub
        SecretKey keys = Keys.hmacShaKeyFor(secretKey.getBytes());
        return Jwts.builder()
        .subject(userDetails.getUsername())
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + jwtExpiry))
        .signWith(keys, Jwts.SIG.HS256)
        .compact();
    }

    @Override
    public BlogUserDetails validateToken(String token) {
        // TODO Auto-generated method stub
        String username = extractUsername(token);
        return userDetailsService.loadUserByUsername(username);
    }

    private String extractUsername(String token) {
        SecretKey keys = Keys.hmacShaKeyFor(secretKey.getBytes());
        // Jws<Claims> signedClaims = Jwts.parser().keyLocator(key).build().parseSignedClaims(token);
        // return signedClaims.getPayload().getSubject();
        Jws<Claims> signedClaims = Jwts.parser().verifyWith(keys).build().parseSignedClaims(token);
        return signedClaims.getPayload().getSubject();
    }
    

}
