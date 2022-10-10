package com.project.vetClinic.mail;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class EmailConfiguration {
    private String host = "smtp.mailtrap.io";
    private int port = 2525;
    private String username = "5f2b20f9718329";
    private String password = "c6e0bf6bdceaae";
}
