package com.pranton.blog.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import com.pranton.blog.dto.CategoryDto;
import com.pranton.blog.dto.CreateCategoryRequest;
import com.pranton.blog.entity.Category;
import com.pranton.blog.entity.Post;
import com.pranton.blog.enums.PostStatus;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {
    @Mapping(target = "postCount", source = "posts", qualifiedByName = "calculatePostCount")
    CategoryDto toDto(Category category);

    @Named("calculatePostCount")
    default long calculatePostCount(List<Post> posts) {
        if(posts == null) {
            return 0;
        }
        return posts.stream().filter(post -> post.getStatus().equals(PostStatus.PUBLISHED)).count();
    }

    Category toEntity(CreateCategoryRequest request);
}
