package com.project.vetClinic.service.serviceImpl;

import com.project.vetClinic.model.*;
import com.project.vetClinic.model.dto.AppointmentDto;
import com.project.vetClinic.model.dto.OwnerActivityDto;
import com.project.vetClinic.model.dto.OwnerDto;
import com.project.vetClinic.repository.OwnerActivityRepository;
import com.project.vetClinic.repository.OwnerRepository;
import com.project.vetClinic.service.OwnerActivityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class OwnerActivityServiceImpl implements OwnerActivityService {
    private final OwnerActivityRepository ownerActivityRepository;
    private final OwnerRepository ownerRepository;

    @Override
    public Collection<OwnerActivityDto> getAll() {
        List<OwnerActivity> ownerActivities = ownerActivityRepository.findAll();

        List<OwnerActivityDto> ownerActivitiesDto = new ArrayList<>();
        ownerActivities.forEach(
                activity -> ownerActivitiesDto.add(new OwnerActivityDto().convertModelToDto(activity))
        );
        return ownerActivitiesDto;
    }

    @Override
    public OwnerActivityDto create(long id, String login) {
        log.info("Creating activity log for owner {} with login at: {}", id, login);

        Owner owner = ownerRepository.getById(id);
        OwnerActivity ownerActivity = new OwnerActivity();
        ownerActivity.setOwner(owner);
        ownerActivity.setLogin(login);
        ownerActivity.setLogout("");
        return new OwnerActivityDto().convertModelToDto(ownerActivityRepository.save(ownerActivity));

    }

    @Override
    public OwnerActivityDto update(long id, String logout) {
        log.info("Updating activity for {} with logout: {}",id, logout);

        OwnerActivity ownerActivity = ownerActivityRepository.getById(id);
        ownerActivity.setLogout(logout);

        return new OwnerActivityDto().convertModelToDto(ownerActivityRepository.save(ownerActivity));
    }


}
