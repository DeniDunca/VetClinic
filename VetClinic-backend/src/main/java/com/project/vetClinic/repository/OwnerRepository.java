package com.project.vetClinic.repository;

import com.project.vetClinic.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
    Owner findByNameAndPassword(String name, String password);
    Owner findByEmail(String email);
    Owner findByName(String name);
}
