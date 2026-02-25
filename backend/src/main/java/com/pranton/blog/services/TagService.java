package com.pranton.blog.services;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.pranton.blog.entity.Tag;

public interface TagService {
    List<Tag> getTags();
    List<Tag> createTag(Set<String> names);
    void deleteTag(UUID id);
    Tag getTagById(UUID id);
    List<Tag> getTagsByIds(Set<UUID> tagIds);
}
