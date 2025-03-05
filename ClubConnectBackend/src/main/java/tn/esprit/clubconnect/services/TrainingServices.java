package tn.esprit.clubconnect.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.clubconnect.entities.Training;
import tn.esprit.clubconnect.repositories.ITrainingRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class TrainingServices implements ITrainingServices{
    private ITrainingRepository trainingRepository;

    @Override
    public Training addTraining(Training training) {
        return trainingRepository.save(training);
    }

    @Override
    public Training updateTraining(Training training) {
        return trainingRepository.save(training);
    }

    @Override
    public void deleteTraining(Integer idT) {
        trainingRepository.deleteById(idT);
    }

    @Override
    public Training getById(Integer idT) {
        return trainingRepository.findById(idT).orElse(null);
    }

    @Override
    public List<Training> getAll() {
        return (List<Training>) trainingRepository.findAll();
    }
}
