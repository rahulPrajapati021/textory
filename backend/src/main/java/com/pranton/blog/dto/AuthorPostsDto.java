package com.pranton.blog.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorPostsDto {
    private String id;
    private String name;
    private List<PostsDto> posts;
}
