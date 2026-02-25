package com.pranton.blog.services.impls;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pranton.blog.dto.CreatePostRequest;
import com.pranton.blog.dto.UpdatePostRequest;
import com.pranton.blog.entity.Category;
import com.pranton.blog.entity.Post;
import com.pranton.blog.entity.Tag;
import com.pranton.blog.entity.User;
import com.pranton.blog.enums.PostStatus;
import com.pranton.blog.repositories.PostRepository;
import com.pranton.blog.services.CategoryService;
import com.pranton.blog.services.PostService;
import com.pranton.blog.services.TagService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostServiceImp implements PostService {
    private static final int WORD_PER_MINUTE = 200; // for calcualting reading time
    private final PostRepository postRepository;
    private final CategoryService categoryService;

    private final TagService tagService;

    // calculating reading time by wordCount/word_per_minute;
    private int calculateReadingTime(String content) {
        if (content == null || content.isEmpty()) {
            return 0;
        }
        int wordCount = content.trim().split("\\s+").length;
        return (int) Math.ceil((double) wordCount / WORD_PER_MINUTE);
    }

    @Override
    public List<Post> getPosts(UUID categoryId, UUID tagId, Pageable pageable) {
        // TODO Auto-generated method stub
        if (categoryId != null && tagId != null) {
            Category categoryById = categoryService.getCategoryById(categoryId);
            Tag tagById = tagService.getTagById(tagId);
            return postRepository.findAllByStatusAndCategoryAndTagsContaining(PostStatus.PUBLISHED, categoryById,
                    tagById, pageable);
        }

        if (categoryId != null) {
            Category categoryById = categoryService.getCategoryById(categoryId);
            return postRepository.findAllByStatusAndCategory(PostStatus.PUBLISHED, categoryById, pageable);
        }
        if (tagId != null) {
            Tag tagById = tagService.getTagById(tagId);
            return postRepository.findAllByStatusAndTagsContaining(PostStatus.PUBLISHED, tagById, pageable);
        }

        return postRepository.findAllByStatus(PostStatus.PUBLISHED, pageable);
    }

    @Override
    public Post getPost(UUID id) {
        // TODO Auto-generated method stub
        return postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id " + id));
    }

    @Override
    public List<Post> getPostByAuthor(User user, PostStatus status, Pageable pageable) {
        // TODO Auto-generated method stub
        return postRepository.findAllByAuthorAndStatus(user, status, pageable);
    }

    @Override
    @Transactional
    public Post createPost(User user, CreatePostRequest createPostRequest) {
        // TODO Auto-generated method stub
        Post newPost = new Post();

        // set all the values
        newPost.setAuthor(user);
        newPost.setTitle(createPostRequest.getTitle());
        newPost.setContent(createPostRequest.getContent());
        newPost.setStatus(createPostRequest.getStatus());
        newPost.setReadingTime(calculateReadingTime(createPostRequest.getContent()));

        // set category & tags
        Category category = categoryService.getCategoryById(createPostRequest.getCategoryId());
        newPost.setCategory(category);
        List<Tag> tags = tagService.getTagsByIds(createPostRequest.getTagIds());
        newPost.setTags(new HashSet<>(tags));
        return postRepository.save(newPost);
    }

    @Override
    @Transactional
    public Post updatePost(UUID id, UpdatePostRequest updatePostRequest) {
        // TODO Auto-generated method stub
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id " + id));
        existingPost.setTitle(updatePostRequest.getTitle());
        existingPost.setContent(updatePostRequest.getContent());
        existingPost.setStatus(updatePostRequest.getStatus());
        existingPost.setReadingTime(calculateReadingTime(updatePostRequest.getContent()));
        // update category
        if (!existingPost.getCategory().getId().equals(updatePostRequest.getCategoryId())) {
            Category updatedCategory = categoryService.getCategoryById(updatePostRequest.getCategoryId());
            existingPost.setCategory(updatedCategory);
        }
        List<UUID> existingTagsList = existingPost.getTags().stream().map(tag -> tag.getId()).toList();
        if (!updatePostRequest.getTagIds().equals(existingTagsList)) {
            List<Tag> updatedTags = tagService.getTagsByIds(updatePostRequest.getTagIds());
            existingPost.setTags(new HashSet<>(updatedTags));
        }

        return postRepository.save(existingPost);
    }

    @Override
    public void deletePost(UUID id) {
        // TODO Auto-generated method stub
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id " + id));
        postRepository.delete(existingPost);
    }

}
