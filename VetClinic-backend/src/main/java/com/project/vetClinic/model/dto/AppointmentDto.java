package com.project.vetClinic.model.dto;

import com.project.vetClinic.model.Appointment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDto {
    private Long id;
    private LocalDate date;
    private LocalTime start;
    private LocalTime finish;
    private String reason;
    private Long ownerId;
    private Long petId;
    private Long vetId;
    private String ownerName;
    private String vetName;
    private String petName;

    public AppointmentDto convertModelToDto(Appointment appointment) {
        return new AppointmentDto(appointment.getId(),
                appointment.getDate(),
                appointment.getStart(),
                appointment.getFinish(),
                appointment.getReason(),
                appointment.getOwner().getId(),
                appointment.getPet().getId(),
                appointment.getVet().getId(),
                appointment.getOwner().getName(),
                appointment.getVet().getName(),
                appointment.getPet().getName()
        );
    }
}
