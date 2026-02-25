package com.pranton.blog.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.pranton.blog.enums.PostStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdatePostRequestDto {
    
    @NotNull(message = "id is required")
    private UUID id;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 200, message = "Title must be between {min} and {max}")
    private String title;

    @NotBlank(message = "Content is required")
    @Size(min = 10, max = 50000, message = "Content must be between {min} and {max}")
    private String content;

    @NotNull(message = "category id is required")
    private UUID categoryId;

    @Size(max = 10, message = "max {max} tags are allowed")
    @Builder.Default
    private Set<UUID> tagIds = new HashSet<>();

    @NotNull(message = "status is required")
    private PostStatus status;
}
