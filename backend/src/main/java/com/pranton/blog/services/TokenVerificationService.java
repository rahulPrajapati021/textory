package com.pranton.blog.services;

import java.util.UUID;

public interface TokenVerificationService {
    String generateToken(String email, UUID userId);    
    boolean verifyToken(String token, String email, UUID userId);
}
