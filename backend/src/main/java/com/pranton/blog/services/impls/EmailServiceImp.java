package com.pranton.blog.services.impls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.pranton.blog.dto.EmailDetails;
import com.pranton.blog.services.EmailService;

@Service
public class EmailServiceImp implements EmailService {
    
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public boolean sendSimpleMail(EmailDetails details) {
        try {

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(sender);
            message.setTo(details.getRecipient());
            message.setSubject(details.getSubject());
            message.setText(details.getMsgBody());
            javaMailSender.send(message);
            return true;
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public void sendSimpleMailWithAttachment(EmailDetails details) {
        // TODO Auto-generated method stub
    }

}
