package com.pranton.blog.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;

import com.pranton.blog.entity.Category;

public interface CategoryService {
    List<Category> listCategories(Pageable pageable);
    
    Category createCategory(Category category);
    void deleteCategory(UUID id);
    Category getCategoryById(UUID id);
}

