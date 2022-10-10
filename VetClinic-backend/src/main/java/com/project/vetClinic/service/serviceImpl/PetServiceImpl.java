package com.project.vetClinic.service.serviceImpl;

import com.project.vetClinic.model.Appointment;
import com.project.vetClinic.model.Owner;
import com.project.vetClinic.model.Pet;
import com.project.vetClinic.model.dto.AppointmentDto;
import com.project.vetClinic.model.dto.PetDto;
import com.project.vetClinic.repository.OwnerRepository;
import com.project.vetClinic.repository.PetRepository;
import com.project.vetClinic.service.PetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static java.lang.Boolean.TRUE;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class PetServiceImpl implements PetService {
    private final PetRepository petRepository;
    private final OwnerRepository ownerRepository;


    @Override
    public PetDto create(PetDto petDto) {
        log.info("Saving new pet: {} for owner {}", petDto.getName(), petDto.getOwnerId());
        Owner owner = ownerRepository.getById(petDto.getOwnerId());

        Pet pet = new Pet();
        pet.setName(petDto.getName());
        pet.setType(petDto.getType());
        pet.setRace(petDto.getRace());
        pet.setAge(petDto.getAge());
        pet.setInfo(petDto.getInfo());
        pet.setOwner(owner);

        return new PetDto().convertModelToDto(petRepository.save(pet));
    }

    @Override
    public PetDto get(Long id) {
        log.info("Get pet with id: {}", id);
        return new PetDto().convertModelToDto(petRepository.getById(id));
    }

    @Override
    public PetDto update(PetDto petDto) {
        log.info("Update pet with id: {} for owner with id: {}", petDto.getId(), petDto.getOwnerId());

        Pet pet = petRepository.getById(petDto.getId());
        pet.setName(petDto.getName());
        pet.setType(petDto.getType());
        pet.setRace(petDto.getRace());
        pet.setAge(petDto.getAge());
        pet.setInfo(petDto.getInfo());

        return new PetDto().convertModelToDto(petRepository.save(pet));
    }

    @Override
    public Boolean delete(Long id) {
        log.info("Delete pet with id: {}", id);
        petRepository.deleteById(id);
        return TRUE;
    }

    @Override
    public Collection<AppointmentDto> getPetAppointments(Long id) {
        log.info("Get Appointments for pet with id: {}", id);
        Pet pet = petRepository.getById(id);
        List<Appointment> appointments = pet.getAppointments();

        List<AppointmentDto> appointmentsDto = new ArrayList<>();
        appointments.forEach(
                appointment -> appointmentsDto.add(new AppointmentDto().convertModelToDto(appointment))
        );

        return appointmentsDto;
    }

    @Override
    public PetDto storePhoto(MultipartFile photo, Long id) throws IOException {
        Pet pet = petRepository.getById(id);
        pet.setPhoto(photo.getBytes());
        return new PetDto().convertModelToDto(petRepository.save(pet));
    }

}
