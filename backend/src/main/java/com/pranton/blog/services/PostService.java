package com.pranton.blog.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;

import com.pranton.blog.dto.CreatePostRequest;
import com.pranton.blog.dto.UpdatePostRequest;
import com.pranton.blog.entity.Post;
import com.pranton.blog.entity.User;
import com.pranton.blog.enums.PostStatus;

public interface PostService {
    List<Post> getPosts(UUID categoryId, UUID tagId, Pageable pageable);
    Post getPost(UUID id);
    List<Post> getPostByAuthor(User user, PostStatus status, Pageable pageable);
    Post createPost(User user, CreatePostRequest createPostRequest);
    Post updatePost(UUID id, UpdatePostRequest updatePostRequest);
    void deletePost(UUID id);
}