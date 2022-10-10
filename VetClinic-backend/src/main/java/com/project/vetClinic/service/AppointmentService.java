package com.project.vetClinic.service;

import com.project.vetClinic.model.dto.AppointmentDto;

public interface AppointmentService {
    AppointmentDto create(AppointmentDto appointmentDto);

    AppointmentDto get(Long id);

    AppointmentDto update(AppointmentDto appointmentDto);

    Boolean delete(Long id);
}
