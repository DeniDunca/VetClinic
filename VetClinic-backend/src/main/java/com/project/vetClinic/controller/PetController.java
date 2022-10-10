package com.project.vetClinic.controller;

import com.project.vetClinic.model.dto.PetDto;
import com.project.vetClinic.model.response.Response;
import com.project.vetClinic.service.serviceImpl.PetServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

import static java.time.LocalDateTime.now;

@RestController
@RequestMapping("/api/pet")
@RequiredArgsConstructor
@CrossOrigin
public class PetController {
    private final PetServiceImpl petService;

    @PostMapping("/save")
    public ResponseEntity<Response> savePet(@RequestBody PetDto pet) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("pet", petService.create(pet)))
                        .message("Pet created")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getPet(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("pet", petService.get(id)))
                        .message("Pet retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @PutMapping("/update")
    public ResponseEntity<Response> updatePet(@RequestBody PetDto pet) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("pet", petService.update(pet)))
                        .message("Pet updated")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deletePet(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("deleted", petService.delete(id)))
                        .message("Pet deleted")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/getAppointments/{id}")
    public ResponseEntity<Response> getAppointmentsForPet(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("appointments", petService.getPetAppointments(id)))
                        .message("Appointment list")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }


    @PostMapping("/upload")
    public ResponseEntity<Response> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id) {
        try {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(now())
                            .data(Map.of("Photo", petService.storePhoto(file, id)))
                            .message("Photo")
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(now())
                            .message("Error")
                            .status(HttpStatus.EXPECTATION_FAILED)
                            .statusCode(HttpStatus.EXPECTATION_FAILED.value())
                            .build()
            );
        }
    }
}
