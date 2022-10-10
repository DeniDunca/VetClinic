package com.project.vetClinic.service.serviceImpl;

import com.project.vetClinic.model.Appointment;
import com.project.vetClinic.model.Vet;
import com.project.vetClinic.model.dto.AppointmentDto;
import com.project.vetClinic.model.dto.VetDto;
import com.project.vetClinic.model.factory.UserFactory;
import com.project.vetClinic.repository.VetRepository;
import com.project.vetClinic.service.VetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
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
public class VetServiceImpl implements VetService {
    public final VetRepository vetRepository;

    @Override
    public VetDto create(VetDto vetDto) {
        log.info("Saving new vet: {}", vetDto.getName());
        Vet vet = (Vet) UserFactory.getUser("Vet", vetDto.getName(), vetDto.getPassword(), vetDto.getPhone(), vetDto.getEmail());
        vet.setClinic(vetDto.getClinic());
        vet.setStart(vetDto.getStart());
        vet.setFinish(vetDto.getFinish());
        return new VetDto().convertModelToDto(vetRepository.save(vet));
    }

    @Override
    public VetDto get(Long id) {
        log.info("Getting vet with id: {}", id);
        return new VetDto().convertModelToDto(vetRepository.findById(id).get());
    }

    @Override
    public VetDto update(Vet vet) {
        log.info("Updating vet with id: {}", vet.getId());
        return new VetDto().convertModelToDto(vetRepository.save(vet));
    }

    @Override
    public Boolean delete(Long id) {
        log.info("Deleting vet: {}", id);
        vetRepository.deleteById(id);
        return TRUE;
    }

    @Override
    public Collection<VetDto> getAll(int page, int limit) {
        log.info("Getting {} vet from page {}", limit, page);
        List<Vet> vets = vetRepository.findAll(PageRequest.of(page, limit)).toList();

        List<VetDto> vetsDto = new ArrayList();
        vets.forEach(
                vet -> vetsDto.add(new VetDto().convertModelToDto(vet))
        );

        return vetsDto;
    }

    @Override
    public Collection<AppointmentDto> getAppointmentsForVet(Long id) {
        log.info("List of appointments for vet: {}", id);
        Vet vet = vetRepository.getById(id);
        List<Appointment> appointments = vet.getAppointments();

        List<AppointmentDto> appointmentsDto = new ArrayList<>();
        appointments.forEach(
                appointment -> appointmentsDto.add(new AppointmentDto().convertModelToDto(appointment))
        );

        return appointmentsDto;
    }

    @Override
    public Collection<AppointmentDto> getAppointmentsForVetByDate(Long id, String date) {
        LocalDate localDate = LocalDate.parse(date);
        log.info("List of appointments for vet: {} from date: {}", id, localDate);
        Vet vet = vetRepository.getById(id);
        List<Appointment> appointments = vet.getAppointments();

        List<AppointmentDto> appointmentsDto = new ArrayList<>();

        for (Appointment appointment : appointments) {
            if (appointment.getDate().equals(localDate)) {
                appointmentsDto.add(new AppointmentDto().convertModelToDto(appointment));
            }
        }
        return appointmentsDto;
    }

    @Override
    public Collection<AppointmentDto> getAppointmentsForVetByOwner(Long id, String name) {
        log.info("List of appointments for vet: {} by owner: {} ", id, name);
        Vet vet = vetRepository.getById(id);
        List<Appointment> appointments = vet.getAppointments();

        List<AppointmentDto> appointmentsDto = new ArrayList<>();

        for (Appointment appointment : appointments) {
            if (appointment.getOwner().getName().equals(name)) {
                appointmentsDto.add(new AppointmentDto().convertModelToDto(appointment));
            }
        }

        return appointmentsDto;
    }

    @Override
    public VetDto findByNameAndPassword(String name, String password) {
        return new VetDto().convertModelToDto(vetRepository.findByNameAndPassword(name, password));
    }
}
