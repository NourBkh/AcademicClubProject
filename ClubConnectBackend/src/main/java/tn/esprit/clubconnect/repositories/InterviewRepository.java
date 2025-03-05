package tn.esprit.clubconnect.repositories;

import tn.esprit.clubconnect.entities.Interview;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Integer> {
}


