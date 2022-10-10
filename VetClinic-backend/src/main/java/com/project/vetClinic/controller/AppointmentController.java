package com.project.vetClinic.controller;

import com.project.vetClinic.model.dto.AppointmentDto;
import com.project.vetClinic.model.response.Response;
import com.project.vetClinic.service.serviceImpl.AppointmentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static java.time.LocalDateTime.now;

@RestController
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
@CrossOrigin
public class AppointmentController {
    private final AppointmentServiceImpl appointmentService;

    @PostMapping("/save")
    public ResponseEntity<Response> saveAppointment(@RequestBody AppointmentDto appointment) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("appointment", appointmentService.create(appointment)))
                        .message("Appointment created")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getAppointment(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("appointment", appointmentService.get(id)))
                        .message("Appointment retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @PostMapping("/update")
    public ResponseEntity<Response> updateAppointment(@RequestBody AppointmentDto appointment) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("appointment", appointmentService.update(appointment)))
                        .message("Appointment updated")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteAppointment(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("deleted", appointmentService.delete(id)))
                        .message("Appointment deleted")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }


}
