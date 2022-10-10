package com.project.vetClinic.model.factory;

import com.project.vetClinic.model.Owner;
import com.project.vetClinic.model.User;
import com.project.vetClinic.model.Vet;
import org.springframework.stereotype.Component;

@Component
public class UserFactory {
    public static User getUser(String type, String name, String password, String phone, String email) {
        if ("Owner".equalsIgnoreCase(type))
            return Owner.builder()
                    .name(name)
                    .password(password)
                    .phone(phone)
                    .email(email)
                    .build();
        else if ("Vet".equalsIgnoreCase(type))
            return Vet.builder()
                    .name(name)
                    .password(password)
                    .phone(phone)
                    .email(email)
                    .build();

        return null;
    }

}
