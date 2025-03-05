package tn.esprit.clubconnect.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.clubconnect.entities.Training;
import tn.esprit.clubconnect.services.ITrainingServices;

import java.util.List;
@AllArgsConstructor
@RestController
@RequestMapping("/Training")
public class TrainingController {
    private ITrainingServices trainingServices;
    @PostMapping("/addTraining")
    public Training addTraining(@RequestBody Training training){
        return trainingServices.addTraining(training);
    }
    @PutMapping("/updateTraining")
    public Training updateTraining(@RequestBody Training training){
        return trainingServices.updateTraining(training);
    }
    @GetMapping("/get/{id}")
    public Training getTraining(@PathVariable Integer idT){
        return trainingServices.getById(idT);
    }
    @DeleteMapping("/delete/{idT}")
    public void removeTraining(@PathVariable Integer idT){
        trainingServices.deleteTraining(idT);
    }
    @GetMapping("/all")
    public List<Training> getAllTrainings(){
        return trainingServices.getAll();
    }
}
