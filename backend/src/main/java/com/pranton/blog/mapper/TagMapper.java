package com.pranton.blog.mapper;

import java.util.Set;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import com.pranton.blog.dto.TagDto;
import com.pranton.blog.entity.Post;
import com.pranton.blog.entity.Tag;
import com.pranton.blog.enums.PostStatus;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TagMapper {
    @Mapping(target = "postCount", source = "posts", qualifiedByName = "calculatePostCount")
    TagDto toTagDto(Tag tag);

    @Named("calculatePostCount")
    default long calculatePostCount(Set<Post> posts) {
        if(posts == null) {
            return 0;
        }

        return posts.stream().filter(post -> PostStatus.PUBLISHED.equals(post.getStatus())).count();
    }
}
