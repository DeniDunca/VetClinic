package com.project.vetClinic.mail;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    private final EmailConfiguration emailConfiguration;

    public FeedbackController(EmailConfiguration emailConfiguration) {
        this.emailConfiguration = emailConfiguration;
    }

    public void sendEmail(String email, String subject, String msg) {
        //create mail sender
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(emailConfiguration.getHost());
        mailSender.setPort(emailConfiguration.getPort());
        mailSender.setUsername(emailConfiguration.getUsername());
        mailSender.setPassword(emailConfiguration.getPassword());

        //create mail instance
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("vet@feedback.com");
        mailMessage.setTo(email);
        mailMessage.setSubject(subject);
        mailMessage.setText(msg);

        //send mail
        mailSender.send(mailMessage);
    }
}
