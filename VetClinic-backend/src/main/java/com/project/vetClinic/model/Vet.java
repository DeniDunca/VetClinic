package com.project.vetClinic.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Vet extends User {
    private String clinic;
    @NotNull
    private LocalTime start;
    @NotNull
    private LocalTime finish;

    @OneToMany(mappedBy = "vet", cascade = CascadeType.REMOVE, orphanRemoval = true)
    List<Appointment> appointments;
}
