package com.pranton.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
    private String userId;
    private String userEmail;
    private String userName;
    private String token;
    private long expiresIn;
}
