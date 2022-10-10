package com.project.vetClinic.controller;

import com.project.vetClinic.model.dto.AppointmentDto;
import com.project.vetClinic.model.response.Response;
import com.project.vetClinic.service.OwnerActivityService;
import com.project.vetClinic.service.serviceImpl.AppointmentServiceImpl;
import com.project.vetClinic.service.serviceImpl.OwnerActivityServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import static java.time.LocalDateTime.now;

@RestController
@RequestMapping("/api/activity")
@RequiredArgsConstructor
@CrossOrigin
public class OwnerActivityController {
    private final OwnerActivityServiceImpl ownerActivityService;

    @GetMapping("/getActivities")
    public ResponseEntity<Response> getActivities() {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("ownerActivity", ownerActivityService.getAll()))
                        .message("Owner Activity")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/save/{id}/{login}")
    public ResponseEntity<Response> saveActivity(@PathVariable("id") Long id,@PathVariable("login") String login) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("activity", ownerActivityService.create(id, login)))
                        .message("Activity created with login")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @GetMapping("/update/{id}/{logout}")
    public ResponseEntity<Response> updateActivity(@PathVariable("id") Long id,@PathVariable("logout") String logout) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(Map.of("activity", ownerActivityService.update(id, logout)))
                        .message("Activity updated with logout")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

}
