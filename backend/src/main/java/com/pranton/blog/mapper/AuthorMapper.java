package com.pranton.blog.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import com.pranton.blog.dto.AuthorPostCountDto;
import com.pranton.blog.entity.Post;
import com.pranton.blog.entity.User;
import com.pranton.blog.enums.PostStatus;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuthorMapper {
    @Mapping(target = "postCount", source = "posts", qualifiedByName = "calculatePostCountForAuthor")
    AuthorPostCountDto toAuthorPostCountDto(User user);

    @Named("calculatePostCountForAuthor")
    default long calculatePostCountForAuthor(List<Post> posts) {
        if (posts == null) {
            return 0;
        }
        return posts.stream().filter((post) -> post.getStatus().equals(PostStatus.PUBLISHED)).count();
    }

}