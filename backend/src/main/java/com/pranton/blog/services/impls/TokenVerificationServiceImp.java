package com.pranton.blog.services.impls;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.pranton.blog.services.TokenVerificationService;

@Service
public class TokenVerificationServiceImp implements TokenVerificationService {

    private String HMAC_ALGO = "HmacSHA256";
    @Value("${jwt.secret}")
    private String secret;

    @Override
    public String generateToken(String email, UUID userId) {
        try {

            String data = email + ":" + userId.toString();
            SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(), HMAC_ALGO);
            Mac mac = Mac.getInstance(HMAC_ALGO);
            mac.init(secretKeySpec);
            byte[] signatureFinal = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(signatureFinal);
        } catch (Exception e) {
            // TODO: handle exception
            return "";
        }
    }

    @Override
    public boolean verifyToken(String token, String email, UUID userId) {
        // TODO Auto-generated method stub
        String expectedToken = generateToken(email, userId);
        return expectedToken.equals(token);
    }

}
