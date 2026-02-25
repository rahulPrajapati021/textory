package com.pranton.blog.controllers;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pranton.blog.dto.AuthResponse;
import com.pranton.blog.dto.EmailDetails;
import com.pranton.blog.dto.LoginRequest;
import com.pranton.blog.dto.RegisterRequest;
import com.pranton.blog.entity.User;
import com.pranton.blog.security.BlogUserDetails;
import com.pranton.blog.services.AuthenticationService;
import com.pranton.blog.services.EmailService;
import com.pranton.blog.services.TokenVerificationService;
import com.pranton.blog.services.UserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final TokenVerificationService tokenVerificationService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        BlogUserDetails userDetails = authenticationService.authenticate(loginRequest.getEmail(),
                loginRequest.getPassword());
        String token = authenticationService.generateToken(userDetails);

        UUID id = userDetails.getId();
        AuthResponse authResponse = AuthResponse.builder().userId(id.toString()).userEmail(userDetails.getUsername()).userName(userDetails.getFullName()).token(token).expiresIn(86400).build();
        return ResponseEntity.ok(authResponse);
    }

    @Transactional
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest registerRequest) {
        if (registerRequest.getEmail().equals("") || registerRequest.getPassword().equals("")) {
            return ResponseEntity.status(404).body(Map.of("message", "email & password are req fields"));
        }
        Optional<User> userByEmail = userService.getUserByEmail(registerRequest.getEmail());
        if (userByEmail.isPresent()) {
            return ResponseEntity.status(404).body(Map.of("message", "user already exists with given email"));
        }
        User user = User.builder().email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword())).name(registerRequest.getName())
                .build();
        user = userService.createUser(user);
        String encodedEmail = tokenVerificationService.generateToken(user.getEmail(), user.getId());
        String messageBody = "<a href='http://localhost:8080/api/v1/auth/verifyToken?email=" + user.getEmail()
                + "&token=" + encodedEmail + "'>Verify Email</a>";
        EmailDetails emailDetails = EmailDetails.builder().recipient(user.getEmail()).msgBody(messageBody)
                .subject("BlogApp Verification Email").build();
        emailService.sendSimpleMail(emailDetails);
        return ResponseEntity.status(201)
                .body(Map.of("message", "verification email sent to address : " + user.getEmail()));
    }

    @PostMapping("/applyForVerification")
    public ResponseEntity<Map<String, String>> sendVerificationMail(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userService.getUserByEmail(loginRequest.getEmail());
        if (user.isEmpty() || user.get().isEmailVerified()) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found or already verified"));
        }
        String encodedEmail = tokenVerificationService.generateToken(user.get().getEmail(), user.get().getId());
        String messageBody = "<a href='http://localhost:8080/api/v1/auth/verifyToken?email=" + user.get().getEmail()
                + "&token=" + encodedEmail + "'>Verify Email</a>";
        EmailDetails emailDetails = EmailDetails.builder().recipient(user.get().getEmail()).msgBody(messageBody)
                .subject("BlogApp Verification Email").build();
        emailService.sendSimpleMail(emailDetails);
        return ResponseEntity.status(200)
                .body(Map.of("message", "verification email sent to address : " + user.get().getEmail()));
    }

    @GetMapping("/verifyToken")
    public ResponseEntity<Map<String, String>> verifyToken(@RequestParam String token, @RequestParam String email) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isEmpty() || user.get().isEmailVerified()) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found or already verified"));
        }

        if (tokenVerificationService.verifyToken(token, user.get().getEmail(), user.get().getId())) {
            user.get().setEmailVerified(true);
            userService.saveUser(user.get());
            return ResponseEntity.status(200).body(Map.of("message", "email verified please login again"));
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "illeagal token found"));
        }

    }
}