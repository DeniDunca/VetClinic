package com.project.vetClinic.model.dto;

import com.project.vetClinic.model.Appointment;
import com.project.vetClinic.model.OwnerActivity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@Data
@AllArgsConstructor
@NoArgsConstructor
@XmlRootElement(name="ownerActivity")
@XmlAccessorType(XmlAccessType.FIELD)
public class OwnerActivityDto {
    private Long id;
    private Long ownerId;
    private String ownerName;
    private String login;
    private String logout;

    public OwnerActivityDto convertModelToDto(OwnerActivity ownerActivity) {
        return new OwnerActivityDto(ownerActivity.getId(),
                ownerActivity.getOwner().getId(),
                ownerActivity.getOwner().getName(),
                ownerActivity.getLogin(),
                ownerActivity.getLogout()
        );
    }
}
