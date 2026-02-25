package com.pranton.blog.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.pranton.blog.enums.PostStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreatePostRequest {
    private String title;
    private String content;
    private UUID categoryId;
    @Builder.Default
    private Set<UUID> tagIds = new HashSet<>();

    private PostStatus status;
}
