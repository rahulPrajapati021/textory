package com.pranton.blog.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pranton.blog.dto.CreatePostRequest;
import com.pranton.blog.dto.CreatePostRequestDto;
import com.pranton.blog.dto.PostsDto;
import com.pranton.blog.dto.UpdatePostRequest;
import com.pranton.blog.dto.UpdatePostRequestDto;
import com.pranton.blog.entity.Post;
import com.pranton.blog.entity.User;
import com.pranton.blog.enums.PostStatus;
import com.pranton.blog.mapper.PostMapper;
import com.pranton.blog.services.PostService;
import com.pranton.blog.services.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


/*
Method lists - 
Get - getposts()
Get (/authorId) - getPostByAuthor();
Get (/id) - getPost()
Get (/drafts) - getDraftPosts()
Post - createPost()
Put (/id) - updatePost()
Delete (id) - deletePost()
*/

@RestController
@RequestMapping(path = "/api/v1/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final PostMapper postMapper;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<PostsDto>> getPosts(
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) UUID tagId,
            @RequestParam(required = false, defaultValue = "updatedAt") String sortBy, 
            @RequestParam(required = false, defaultValue = "false") boolean ascending
        ) {
            Sort sort = ascending?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        PageRequest pageable = PageRequest.of(page, size, sort);
        List<Post> posts = postService.getPosts(categoryId, tagId, pageable);
        List<PostsDto> list = posts.stream().map(postMapper::toPostDto).toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping(path = "/postByAuthor/{authorId}")
    public ResponseEntity<List<PostsDto>> getPostByAuthor(
        @PathVariable UUID authorId,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false, defaultValue = "updatedAt") String sortBy, 
        @RequestParam(required = false, defaultValue = "false") boolean ascending
    ) {
        Sort sort = ascending?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        PageRequest pageable = PageRequest.of(page, size, sort);
        User user = userService.getUserById(authorId);
        List<Post> posts = postService.getPostByAuthor(user, PostStatus.PUBLISHED, pageable);
        List<PostsDto> list = posts.stream().map(postMapper::toPostDto).toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping(path = "/userPosts")
    public ResponseEntity<List<PostsDto>> getUserPosts(
        @RequestAttribute UUID userId,
        @RequestParam(required = false, defaultValue = "PUBLISHED") String status,
        @RequestParam(required = false, defaultValue = "0") int page,
        @RequestParam(required = false, defaultValue = "20") int size,
        @RequestParam(required = false, defaultValue = "updatedAt") String sortBy,
        @RequestParam(required = false, defaultValue = "false") boolean ascending
    ) {
        User loggedInUser = userService.getUserById(userId);
        Sort sort = ascending?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        // if pass anything else then published post should be returned
        PostStatus postType = PostStatus.valueOf(status);
        System.out.println(postType);
        List<Post> userPosts = postService.getPostByAuthor(loggedInUser, postType, pageable);
        List<PostsDto> list = userPosts.stream().map(postMapper::toPostDto).toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<PostsDto> getPost(@PathVariable UUID id, @RequestAttribute(required =  false) UUID userId) {
        Post post = postService.getPost(id);
        if(post.getStatus().equals(PostStatus.PUBLISHED)) {
            PostsDto postDto = postMapper.toPostDto(post);
            return ResponseEntity.ok(postDto);
        }
        else if(userId != null) {
            if(post.getAuthor().getId().equals(userId)) {
                PostsDto postDto = postMapper.toPostDto(post);
                return ResponseEntity.ok(postDto);
            }
            else {
                return ResponseEntity.notFound().build();
            }
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<PostsDto> createPost(@Valid @RequestBody CreatePostRequestDto createPostRequestDto,
            @RequestAttribute UUID userId) {
        User loggedInUser = userService.getUserById(userId);
        CreatePostRequest createPostRequest = postMapper.toCreatePostRequest(createPostRequestDto);
        Post post = postService.createPost(loggedInUser, createPostRequest);
        PostsDto postDto = postMapper.toPostDto(post);
        return ResponseEntity.status(201).body(postDto);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<PostsDto> updatePost(@PathVariable UUID id,
            @Valid @RequestBody UpdatePostRequestDto updatePostRequestDto) {
        UpdatePostRequest updatePostRequest = postMapper.toUpdatePostRequest(updatePostRequestDto);
        Post updatedPost = postService.updatePost(id, updatePostRequest);
        PostsDto postDto = postMapper.toPostDto(updatedPost);
        return ResponseEntity.ok(postDto);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
