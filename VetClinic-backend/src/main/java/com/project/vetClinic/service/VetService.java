package com.project.vetClinic.service;

import com.project.vetClinic.model.Vet;
import com.project.vetClinic.model.dto.AppointmentDto;
import com.project.vetClinic.model.dto.VetDto;

import java.util.Collection;

public interface VetService {
    VetDto create(VetDto vetDto);

    VetDto get(Long id);

    VetDto update(Vet vet);

    Boolean delete(Long id);

    Collection<VetDto> getAll(int page, int limit);

    Collection<AppointmentDto> getAppointmentsForVet(Long id);

    Collection<AppointmentDto> getAppointmentsForVetByDate(Long id, String date);

    Collection<AppointmentDto> getAppointmentsForVetByOwner(Long id, String name);

    VetDto findByNameAndPassword(String name, String password);
}
