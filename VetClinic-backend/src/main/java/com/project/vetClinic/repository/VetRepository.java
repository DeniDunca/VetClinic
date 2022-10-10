package com.project.vetClinic.repository;

import com.project.vetClinic.model.Vet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VetRepository extends JpaRepository<Vet, Long> {
    Vet findByNameAndPassword(String name, String password);
    Vet findByName(String name);
}
