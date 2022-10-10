package com.project.vetClinic.service.impl;

import com.project.vetClinic.model.Vet;
import com.project.vetClinic.model.dto.VetDto;
import com.project.vetClinic.repository.VetRepository;
import com.project.vetClinic.service.serviceImpl.VetServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class VetServiceImplTest {
    private static final String NAME = "vet";
    private static final String PASSWORD = "vet";
    private static final String NAME_NOT = "Vet does not exits";
    private static final String PASSWORD_NOT = "Vet does not exits";


    private VetServiceImpl vetService;

    @Mock
    private VetRepository vetRepository;

    @BeforeEach
    void setUp(){
        initMocks(this);
        Vet vet = new Vet();
        vet.setName(NAME);
        vet.setPassword(PASSWORD);
        when(vetRepository.findByNameAndPassword(NAME,PASSWORD)).thenReturn(vet);
    }

    @Test
    void givenExistingName_whenFindByName_thenFindOne(){
        vetService = new VetServiceImpl(vetRepository);
        VetDto vet1 = vetService.findByNameAndPassword(NAME,PASSWORD);

        assertNotNull(vet1);
        assertEquals(NAME, vet1.getName());
        assertEquals(PASSWORD, vet1.getPassword());
    }

    @Test
    void givenNonExistingName_whenFindByName_thenThrowException(){
        when(vetRepository.findByNameAndPassword(NAME_NOT, PASSWORD_NOT)).thenReturn(null);

        Exception e = assertThrows(NullPointerException.class, () ->{
            vetService.findByNameAndPassword(NAME_NOT, PASSWORD_NOT);
        });
    }

    @Test
    void givenValidVet_whenSave_thenSave(){
        Vet vet = new Vet();
        vet.setName("Den");
        when(vetRepository.save(Mockito.any(Vet.class))).thenReturn(vet);

        Vet vet2 = new Vet();
        vet2.setName("Den");
        assertEquals(vetRepository.save(vet2).getName(),"Den");
    }

}
