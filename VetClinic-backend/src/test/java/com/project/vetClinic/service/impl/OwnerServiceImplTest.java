package com.project.vetClinic.service.impl;

import com.project.vetClinic.model.Owner;
import com.project.vetClinic.model.dto.OwnerDto;
import com.project.vetClinic.repository.OwnerRepository;
import com.project.vetClinic.service.serviceImpl.OwnerServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class OwnerServiceImplTest {
    private static final String NAME = "owner";
    private static final String PASSWORD = "owner";
    private static final String NAME_NOT = "Owner does not exits";
    private static final String PASSWORD_NOT = "Owner does not exits";


    private OwnerServiceImpl ownerService;

    @Mock
    private OwnerRepository ownerRepository;

    @BeforeEach
    void setUp(){
        initMocks(this);
        Owner owner = new Owner();
        owner.setName(NAME);
        owner.setPassword(PASSWORD);
        when(ownerRepository.findByNameAndPassword(NAME,PASSWORD)).thenReturn(owner);
    }

    @Test
    void givenNonExistingName_whenFindByName_thenThrowException(){
        when(ownerRepository.findByNameAndPassword(NAME_NOT, PASSWORD_NOT)).thenReturn(null);

        Exception e = assertThrows(NullPointerException.class, () ->{
            ownerService.findByNameAndPassword(NAME_NOT, PASSWORD_NOT);
        });
    }

    @Test
    void givenValidVet_whenSave_thenSave(){
        Owner owner = new Owner();
        owner.setName("Den");
        when(ownerRepository.save(Mockito.any(Owner.class))).thenReturn(owner);

        Owner vet2 = new Owner();
        vet2.setName("Den");
        assertEquals(ownerRepository.save(vet2).getName(),"Den");
    }

}
