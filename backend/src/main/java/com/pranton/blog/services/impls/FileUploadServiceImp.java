package com.pranton.blog.services.impls;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pranton.blog.services.FileUploadService;

@Service
public class FileUploadServiceImp implements FileUploadService {

    @Value("${file.upload-dir}")
    private String uploadPath;

    @Override
    public String save(MultipartFile file, String userId) throws IOException {
        String fileName = userId;
        Path path = Paths.get(uploadPath, fileName);

        Files.createDirectories(path.getParent());
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    
}
