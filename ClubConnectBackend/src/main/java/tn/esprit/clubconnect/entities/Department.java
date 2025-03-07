package tn.esprit.clubconnect.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Department implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idD;
    String nameD;
    String description;
    int memberCount;

    @ManyToOne
    @JsonBackReference
    Club club;


    @OneToMany(mappedBy = "department")
    Set<Interview> interviews;


}
