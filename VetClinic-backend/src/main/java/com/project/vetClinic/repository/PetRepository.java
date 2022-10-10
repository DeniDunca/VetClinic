package com.project.vetClinic.repository;

import com.project.vetClinic.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet,Long> {
    Pet findByName(String name);
}
