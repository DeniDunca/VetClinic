package com.project.vetClinic.service;

import com.project.vetClinic.model.dto.AppointmentDto;
import com.project.vetClinic.model.dto.OwnerActivityDto;

import java.util.Collection;

public interface OwnerActivityService {
    Collection<OwnerActivityDto> getAll();
    OwnerActivityDto create(long id, String login);
    OwnerActivityDto update(long id, String logout);
}
