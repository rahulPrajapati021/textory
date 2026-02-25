package com.pranton.blog.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    String save(MultipartFile file, String userId) throws IOException;
}