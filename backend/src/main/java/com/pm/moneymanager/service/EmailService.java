package com.pm.moneymanager.service;


import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    private String fromEmail;

    public void sendEmail(String to, String subject, String body) {

    }
}
