package com.project.vetClinic.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
@XmlRootElement(name="owner")
@XmlAccessorType(XmlAccessType.FIELD)
public class Owner extends User {

    @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE, orphanRemoval = true)
    List<Pet> pets;

    @OneToMany(mappedBy = "owner")
    List<Appointment> appointments;

    @OneToMany(mappedBy = "owner")
    @XmlElement(name="activity")
    List<OwnerActivity> ownerActivities;
}
