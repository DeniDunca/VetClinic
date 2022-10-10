package com.project.vetClinic.service;

import com.project.vetClinic.model.Owner;
import com.project.vetClinic.model.OwnerActivity;
import com.project.vetClinic.model.dto.*;

import java.util.Collection;

public interface OwnerService {
    OwnerDto create(OwnerDto ownerDto);

    OwnerDto get(Long id);

    OwnerDto update(Owner owner);

    Boolean delete(Long id);

    Collection<OwnerDto> getAll(int page, int limit);

    Collection<PetDto> getPetsForOwner(Long id);

    Collection<AppointmentDto> getAppointmentsForOwner(Long id);

    Collection<AppointmentDto> getAppointmentsForOwnerByDate(Long id, String date);

    Collection<AppointmentDto> getAppointmentsForOwnerByVetAndPet(Long id, String name, String petName);

    OwnerDto findByNameAndPassword(String name, String password);

    OwnerDto findByEmail(String email);

    void updatePassword(PasswordDto passwordDto);

    Collection<OwnerActivityDto> getOwnerActivity(Long id);

    String exportOwnerActivityDetails(String name);

    Collection<OwnerActivityDto> getActivitiesForOwner(String name);
}
