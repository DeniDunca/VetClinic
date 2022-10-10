package com.project.vetClinic.service;

import com.project.vetClinic.model.dto.AppointmentDto;
import com.project.vetClinic.model.dto.PetDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;

public interface PetService {
    PetDto create(PetDto petDto);

    PetDto get(Long id);

    PetDto update(PetDto petDto);

    Boolean delete(Long id);

    Collection<AppointmentDto> getPetAppointments(Long id);

    PetDto storePhoto(MultipartFile photo, Long id) throws IOException;
}
