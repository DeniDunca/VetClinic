package com.project.vetClinic.controller;

import com.project.vetClinic.exporter.XMLFileExporter;
import com.project.vetClinic.model.Owner;
import com.project.vetClinic.model.dto.AuthDto;
import com.project.vetClinic.model.dto.OwnerDto;
import com.project.vetClinic.model.dto.PasswordDto;
import com.project.vetClinic.model.response.Response;
import com.project.vetClinic.service.serviceImpl.OwnerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

import static java.time.LocalDateTime.now;

@RestController
@RequestMapping("/api/owner")
@RequiredArgsConstructor
@CrossOrigin
public class OwnerController {
    private final OwnerServiceImpl ownerService;

    @GetMapping("/getAll/{page}")
    public ResponseEntity<Response> getOwners(@PathVariable("page") int page) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("owners", ownerService.getAll(page, 10)))
                        .message("Owners retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<Response> saveOwner(@RequestBody @Valid OwnerDto ownerDto) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("owner", ownerService.create(ownerDto)))
                        .message("Owner created")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getOwner(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("owner", ownerService.get(id)))
                        .message("Owner retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteOwner(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("deleted", ownerService.delete(id)))
                        .message("Owner deleted")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @PostMapping("/update")
    public ResponseEntity<Response> updateOwner(@RequestBody Owner owner) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("owner", ownerService.update(owner)))
                        .message("Owner updated")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @GetMapping("/getPets/{id}")
    public ResponseEntity<Response> getPetsForOwner(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("pets", ownerService.getPetsForOwner(id)))
                        .message("Pet list")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/getAppointments/{id}")
    public ResponseEntity<Response> getAppointmentsForOwner(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("appointments", ownerService.getAppointmentsForOwner(id)))
                        .message("Appointment list")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/getAppointmentsByDate/{id}/{date}")
    public ResponseEntity<Response> getAppointmentsForOwnerByDate(@PathVariable("id") Long id, @PathVariable("date") String date) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("appointments", ownerService.getAppointmentsForOwnerByDate(id, date)))
                        .message("Appointment list by date")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/getAppointmentsByVetOrPet/{id}/{name}/{petName}")
    public ResponseEntity<Response> getAppointmentsForOwnerByVetAndPet(@PathVariable("id") Long id,
                                                                       @PathVariable("name") String name,
                                                                       @PathVariable("petName") String petName) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("appointments", ownerService.getAppointmentsForOwnerByVetAndPet(id, name, petName)))
                        .message("Appointment list by vet or pet")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<Response> loginForOwner(@RequestBody AuthDto authDto) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("owners", ownerService.findByNameAndPassword(authDto.getName(), authDto.getPassword())))
                        .message("Owner logging in...")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Response> getOwnerByEmail(@PathVariable("email") String email) {
        System.out.println(email);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("owners", ownerService.findByEmail(email)))
                        .message("Owner's email...")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @PutMapping("/updatePassword")
    public ResponseEntity<Response> updatePassword(@RequestBody PasswordDto passwordDto) {
        ownerService.updatePassword(passwordDto);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("owner", "Password changed"))
                        .message("Owner updated")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @GetMapping("/getActivity/{id}")
    public ResponseEntity<Response> getActivityForOwner(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("ownerActivity", ownerService.getOwnerActivity(id)))
                        .message("Owner Activity")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/export/{name}")
    public ResponseEntity<Response> exportOwnerActivity(@PathVariable("name") String name) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("ownerActivity", ownerService.exportOwnerActivityDetails(name)))
                        .message("Owner Activity")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/getActivities/{name}")
    public ResponseEntity<Response> getActivitiesForOwner(@PathVariable("name") String name) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("activities", ownerService.getActivitiesForOwner(name)))
                        .message("Activity list")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }
}
