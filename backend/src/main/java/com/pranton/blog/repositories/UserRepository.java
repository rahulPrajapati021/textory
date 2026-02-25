package com.pranton.blog.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pranton.blog.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>{
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.posts")
    List<User> findAllWithPostCount(Pageable pageable);

    Optional<User> findByEmail(String email);
}
