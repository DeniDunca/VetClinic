package com.project.vetClinic.mail;

import com.sun.istack.NotNull;
import lombok.Data;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;

@Data
@Component
public class Feedback {
    @NotNull
    private String name;

    @NotNull
    @Email
    private String email;

    @NotNull
    @Min(10)
    private String feedback;

}
