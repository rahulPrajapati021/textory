package com.pranton.blog.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;

import com.pranton.blog.entity.User;

public interface UserService {
    List<User> listUsers(Pageable pageable);
    User getUserById(UUID id);
    User createUser(User user);
    User saveUser(User user);
    Optional<User> getUserByEmail(String email);
}