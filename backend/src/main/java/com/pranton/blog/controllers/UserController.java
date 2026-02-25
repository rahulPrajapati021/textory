package com.pranton.blog.controllers;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pranton.blog.services.FileUploadService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final FileUploadService uploadService;

    @PostMapping("/profile-pic") 
    public ResponseEntity<?> uploadProfilePic(@RequestParam MultipartFile file, @RequestAttribute String userId) throws IOException {
        if(userId == null) {
            return ResponseEntity.status(401).body(Map.of("message", "userId not found please login"));
        }
        String fileName = uploadService.save(file, userId);

        return ResponseEntity.status(201).body(Map.of("message", "uploaded Succesffully available at /media/profile/"+ fileName));

    }
}
