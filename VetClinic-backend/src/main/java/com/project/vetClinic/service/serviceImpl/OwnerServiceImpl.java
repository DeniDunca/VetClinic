package com.project.vetClinic.service.serviceImpl;

import com.project.vetClinic.exporter.FileExporter;
import com.project.vetClinic.exporter.XMLFileExporter;
import com.project.vetClinic.mail.FeedbackController;
import com.project.vetClinic.model.Appointment;
import com.project.vetClinic.model.Owner;
import com.project.vetClinic.model.OwnerActivity;
import com.project.vetClinic.model.Pet;
import com.project.vetClinic.model.dto.*;
import com.project.vetClinic.model.factory.UserFactory;
import com.project.vetClinic.repository.OwnerRepository;
import com.project.vetClinic.service.OwnerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static java.lang.Boolean.TRUE;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class OwnerServiceImpl implements OwnerService {
    private final OwnerRepository ownerRepository;
    private final FeedbackController feedbackController;

    @Override
    public OwnerDto create(OwnerDto ownerDto) {
        log.info("Saving new owner: {}", ownerDto.getName());

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(ownerDto.getPassword());
        ownerDto.setPassword(hashedPassword);

        Owner owner = (Owner) UserFactory.getUser("Owner", ownerDto.getName(), ownerDto.getPassword(), ownerDto.getPhone(), ownerDto.getEmail());
        return new OwnerDto().convertModelToDto(ownerRepository.save(owner));
    }

    @Override
    public OwnerDto get(Long id) {
        log.info("Getting owner with id: {}", id);
        return new OwnerDto().convertModelToDto(ownerRepository.findById(id).get());
    }

    @Override
    public OwnerDto update(Owner owner) {
        log.info("Updating owner with id: {}", owner.getId());
        return new OwnerDto().convertModelToDto(ownerRepository.save(owner));
    }

    @Override
    public Boolean delete(Long id) {
        log.info("Deleting owner: {}", id);
        ownerRepository.deleteById(id);
        return TRUE;
    }

    @Override
    public Collection<OwnerDto> getAll(int page, int limit) {
        log.info("Getting {} owners from page {}", limit, page);
        List<Owner> owners = ownerRepository.findAll(PageRequest.of(page, limit)).toList();

        List<OwnerDto> ownersDto = new ArrayList<>();
        owners.forEach(
                owner -> ownersDto.add(new OwnerDto().convertModelToDto(owner))
        );

        return ownersDto;
    }

    @Override
    public Collection<PetDto> getPetsForOwner(Long id) {
        log.info("List of pets for owner: {}", id);
        Owner owner = ownerRepository.getById(id);
        List<Pet> pets = owner.getPets();

        List<PetDto> petsDto = new ArrayList<>();
        pets.forEach(
                pet -> petsDto.add(new PetDto().convertModelToDto(pet)));

        return petsDto;
    }

    @Override
    public Collection<AppointmentDto> getAppointmentsForOwner(Long id) {
        log.info("List of appointments for owner: {}", id);
        Owner owner = ownerRepository.getById(id);
        List<Appointment> appointments = owner.getAppointments();

        List<AppointmentDto> appointmentsDto = new ArrayList<>();
        appointments.forEach(
                appointment -> appointmentsDto.add(new AppointmentDto().convertModelToDto(appointment))
        );

        return appointmentsDto;
    }

    @Override
    public Collection<AppointmentDto> getAppointmentsForOwnerByDate(Long id, String date) {
        LocalDate localDate = LocalDate.parse(date);
        log.info("List of appointments for owner: {} from date: {}", id, localDate);
        Owner owner = ownerRepository.getById(id);
        List<Appointment> appointments = owner.getAppointments();

        List<AppointmentDto> appointmentsDto = new ArrayList<>();

        for (Appointment appointment : appointments) {
            if (appointment.getDate().equals(localDate)) {
                appointmentsDto.add(new AppointmentDto().convertModelToDto(appointment));
            }
        }
        return appointmentsDto;
    }

    @Override
    public Collection<AppointmentDto> getAppointmentsForOwnerByVetAndPet(Long id, String name, String petName) {
        log.info("List of appointments for owner: {} by vet: {} and pet: {}", id, name, petName);
        Owner owner = ownerRepository.getById(id);
        List<Appointment> appointments = owner.getAppointments();

        List<AppointmentDto> appointmentsDto = new ArrayList<>();

        if (name.equals("all")) {
            log.info("Getting only Pets");
            for (Appointment appointment : appointments) {
                if (appointment.getPet().getName().contains(petName)) {
                    appointmentsDto.add(new AppointmentDto().convertModelToDto(appointment));
                }
            }

            return appointmentsDto;
        }

        if (petName.equals("all")) {
            log.info("getting only Vets");
            for (Appointment appointment : appointments) {
                if (appointment.getVet().getName().contains(name)) {
                    appointmentsDto.add(new AppointmentDto().convertModelToDto(appointment));
                }
            }

            return appointmentsDto;
        }

        log.info("Both vets and pets");
        for (Appointment appointment : appointments) {
            if (appointment.getVet().getName().contains(name) &&
                    appointment.getPet().getName().contains(petName)) {
                appointmentsDto.add(new AppointmentDto().convertModelToDto(appointment));
            }
        }

        return appointmentsDto;
    }

    @Override
    public OwnerDto findByNameAndPassword(String name, String password) {
        Owner owner = ownerRepository.findByName(name);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if(passwordEncoder.matches(password,owner.getPassword()))
            return new OwnerDto().convertModelToDto(owner);
        return new OwnerDto();
    }

    @Override
    public OwnerDto findByEmail(String email) {
        Owner owner = ownerRepository.findByEmail(email);
        if (owner == null) {
            return new OwnerDto();
        }
        feedbackController.sendEmail(email, "Reset password for" + owner.getName(), "Enter this link to reset password: http://localhost:3000/resetPassword/" + owner.getId());
        return new OwnerDto().convertModelToDto(ownerRepository.findByEmail(email));
    }

    @Override
    public void updatePassword(PasswordDto passwordDto) {
        Owner owner = ownerRepository.getById(passwordDto.getId());

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(passwordDto.getPassword());

        owner.setPassword(hashedPassword);
        ownerRepository.save(owner);
    }

    @Override
    public Collection<OwnerActivityDto> getOwnerActivity(Long id) {
        log.info("List of activity for owner: {}", id);
        Owner owner = ownerRepository.getById(id);
        List<OwnerActivity> ownerActivities = owner.getOwnerActivities();

        List<OwnerActivityDto> ownerActivityDtos = new ArrayList<>();
        ownerActivities.forEach(
                ownerActivity -> ownerActivityDtos.add(new OwnerActivityDto().convertModelToDto(ownerActivity))
        );

        return ownerActivityDtos;
    }

    @Override
    public String exportOwnerActivityDetails(String name) {
        log.info("Exporting list of activity for owner: {}", name);
        Owner owner = ownerRepository.findByName(name);
        List<OwnerActivity> ownerActivities = owner.getOwnerActivities();

        FileExporter fileExporter;
        fileExporter = new XMLFileExporter();
        StringBuilder xml = new StringBuilder();
        for (OwnerActivity ownerActivity : ownerActivities) {
            xml.append(fileExporter.exportData(new OwnerActivityDto().convertModelToDto(ownerActivity)));
        }
        return xml.toString();
    }

    @Override
    public Collection<OwnerActivityDto> getActivitiesForOwner(String name) {
        log.info("List of activities for owner: {}", name);
        Owner owner = ownerRepository.findByName(name);
        List<OwnerActivity> activities = owner.getOwnerActivities();

        List<OwnerActivityDto> activityDto = new ArrayList<>();
        activities.forEach(
                activity -> activityDto.add(new OwnerActivityDto().convertModelToDto(activity))
        );

        return activityDto;
    }

}
