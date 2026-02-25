package com.pranton.blog.controllers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranton.blog.dto.CreateTagsRequest;
import com.pranton.blog.dto.TagDto;
import com.pranton.blog.entity.Tag;
import com.pranton.blog.mapper.TagMapper;
import com.pranton.blog.services.TagService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/api/v1/tags")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;
    private final TagMapper tagMapper;

    @GetMapping
    public ResponseEntity<List<TagDto>> getAllTags() {
        List<Tag> tags = tagService.getTags();
        List<TagDto> collect = tags.stream().map(tag -> tagMapper.toTagDto(tag)).collect(Collectors.toList());
        return ResponseEntity.ok(collect);
    }
    @PostMapping
    public ResponseEntity<List<TagDto>> createTags(@RequestBody CreateTagsRequest reqBody) {
        List<Tag> tags = tagService.createTag(reqBody.getNames());
        List<TagDto> collect = tags.stream().map(tag -> tagMapper.toTagDto(tag)).collect(Collectors.toList());

        return ResponseEntity.status(201).body(collect);   
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable UUID id) {
        tagService.deleteTag(id);
        return ResponseEntity.noContent().build();
    }
}
