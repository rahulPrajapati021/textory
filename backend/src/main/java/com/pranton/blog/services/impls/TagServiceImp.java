package com.pranton.blog.services.impls;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pranton.blog.entity.Tag;
import com.pranton.blog.repositories.TagRepository;
import com.pranton.blog.services.TagService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagServiceImp implements TagService {
    private final TagRepository tagRepository;

    @Override
    public List<Tag> getTags() {
        // TODO Auto-generated method stub
        return tagRepository.findAllWithPostCount();
    }

    @Override
    @Transactional
    public List<Tag> createTag(Set<String> tagNames) {
        // TODO Auto-generated method stub
        List<Tag> existingTagList = tagRepository.findByNameIn(tagNames);

        List<String> existingTags = existingTagList.stream().map(tag -> tag.getName()).collect(Collectors.toList());

        List<Tag> newTags = tagNames.stream().filter(name -> !existingTags.contains(name))
                .map(name -> Tag.builder().name(name).posts(new HashSet<>()).build()).collect(Collectors.toList());

        List<Tag> result = new ArrayList<>();
        if (!newTags.isEmpty()) {
            result = tagRepository.saveAll(newTags);
        }

        result.addAll(existingTagList);
        return result;
    }

    @Override
    public void deleteTag(UUID id) {
        // TODO Auto-generated method stub
        //check if this tag have posts associated 
        tagRepository.findById(id).ifPresent(tag -> {
            if(!tag.getPosts().isEmpty()) {
                throw new IllegalStateException("Tag is associated with Post cannot delete it");
            }
            tagRepository.delete(tag);
        });
    }

    @Override
    public Tag getTagById(UUID id) {
        // TODO Auto-generated method stub
        return tagRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tag not found with id " + id));
    }

    @Override
    public List<Tag> getTagsByIds(Set<UUID> tagIds) {
        // TODO Auto-generated method stub
        List<Tag> allById = tagRepository.findAllById(tagIds);
        if(allById.size() != tagIds.size()) {
            throw new EntityNotFoundException("tag not found");
        }
        return allById;
    }

}
