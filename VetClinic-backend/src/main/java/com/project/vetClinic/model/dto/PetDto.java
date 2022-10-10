package com.project.vetClinic.model.dto;

import com.project.vetClinic.model.Pet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetDto {
    private Long id;
    private String name;
    private String type;
    private String race;
    private String age;
    private String info;
    private byte[] photo;
    private Long ownerId;

    public PetDto convertModelToDto(Pet pet) {
        return new PetDto(pet.getId(),
                pet.getName(),
                pet.getType(),
                pet.getRace(),
                pet.getAge(),
                pet.getInfo(),
                pet.getPhoto(),
                pet.getOwner().getId());
    }
}
