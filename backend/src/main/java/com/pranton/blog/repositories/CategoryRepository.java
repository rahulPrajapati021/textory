package com.pranton.blog.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pranton.blog.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> { 
    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.posts") 
    List<Category> findAllWithPostCount(Pageable pageable);

    boolean existsByNameIgnoreCase(String name);
} 