package com.pranton.blog.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.pranton.blog.dto.CreatePostRequest;
import com.pranton.blog.dto.CreatePostRequestDto;
import com.pranton.blog.dto.PostsDto;
import com.pranton.blog.dto.UpdatePostRequest;
import com.pranton.blog.dto.UpdatePostRequestDto;
import com.pranton.blog.entity.Post;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {
    @Mapping(source = "author", target = "author")
    @Mapping(source = "category", target = "category")
    @Mapping(source = "tags", target = "tags")
    PostsDto toPostDto(Post post);

    CreatePostRequest toCreatePostRequest(CreatePostRequestDto dto);
    UpdatePostRequest toUpdatePostRequest(UpdatePostRequestDto dto);
}
