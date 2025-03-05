package tn.esprit.clubconnect.services;

import tn.esprit.clubconnect.entities.Training;

import java.util.List;

public interface ITrainingServices {
    Training addTraining(Training training);
    Training updateTraining(Training training);
    void deleteTraining(Integer idT);
    Training getById(Integer idT);
    List<Training> getAll();
}
