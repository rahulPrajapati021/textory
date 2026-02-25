package com.pranton.blog.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pranton.blog.entity.Category;
import com.pranton.blog.entity.Post;
import com.pranton.blog.entity.Tag;
import com.pranton.blog.entity.User;
import com.pranton.blog.enums.PostStatus;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findAllByStatusAndCategoryAndTagsContaining(PostStatus status, Category category, Tag tag, Pageable pageable);
    List<Post> findAllByStatusAndCategory(PostStatus status, Category category, Pageable pageable);
    List<Post> findAllByStatusAndTagsContaining(PostStatus status, Tag tag, Pageable pageable);
    List<Post> findAllByStatus(PostStatus status, Pageable pageable);
    List<Post> findAllByAuthorAndStatus(User author, PostStatus status, Pageable pageable);
}
