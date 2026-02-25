package com.pranton.blog.services;

import com.pranton.blog.dto.EmailDetails;

public interface EmailService {
    boolean sendSimpleMail(EmailDetails details);
    void sendSimpleMailWithAttachment(EmailDetails details);   
}