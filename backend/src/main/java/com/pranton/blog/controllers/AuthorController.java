package com.pranton.blog.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pranton.blog.dto.AuthorDto;
import com.pranton.blog.dto.AuthorPostCountDto;
import com.pranton.blog.entity.User;
import com.pranton.blog.mapper.AuthorMapper;
import com.pranton.blog.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/api/v1/author")
@RequiredArgsConstructor
public class AuthorController {
    private final UserService userService;
    private final AuthorMapper authorMapper;

    @GetMapping("/details/{id}") 
    public ResponseEntity<AuthorDto> getAuthorDetails(
        @PathVariable UUID id
    ) {
        User userById = userService.getUserById(id);
        AuthorDto dto = AuthorDto.builder().id(userById.getId()).name(userById.getName()).build();
        return ResponseEntity.status(200).body(dto);
    }
    @GetMapping("/topAuthors")
    public ResponseEntity<List<AuthorPostCountDto>> getTopAuthors(
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "0") int page) {
        PageRequest pageable = PageRequest.of(page, size);
        List<User> listUser = userService.listUsers(pageable);
        List<AuthorPostCountDto> listAuthor = listUser.stream().map(authorMapper::toAuthorPostCountDto).toList();
        return ResponseEntity.status(200).body(listAuthor);
    }
}
