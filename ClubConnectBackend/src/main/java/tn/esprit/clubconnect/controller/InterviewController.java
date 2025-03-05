package tn.esprit.clubconnect.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.clubconnect.entities.Interview;
import tn.esprit.clubconnect.services.IInterviewServices;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/Interviews")
public class InterviewController {

    private final IInterviewServices interviewService;

    @Autowired
    public InterviewController(IInterviewServices interviewService) {
        this.interviewService = interviewService;
    }

    @PostMapping("/addInterview")
    public ResponseEntity<Interview> addInterview(@RequestBody Interview interview) {
        Interview addedInterview = interviewService.addInterview(interview);
        return new ResponseEntity<>(addedInterview, HttpStatus.CREATED);
    }
    @PutMapping("/updateInterview")
    public ResponseEntity<Interview> updateInterview(@RequestBody Interview interview) {
        if (interview == null || interview.getId() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Integer id = interview.getId();
        Interview existingInterview = interviewService.getInterviewById(id);
        if (existingInterview == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Interview updatedInterview = interviewService.addInterview(interview);
        return new ResponseEntity<>(updatedInterview, HttpStatus.OK);
    }



    @DeleteMapping("/deleteInterview/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable Integer id) {
        interviewService.deleteInterview(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/getInterviewById/{id}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable Integer id) {
        Interview interview = interviewService.getInterviewById(id);
        if (interview == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(interview, HttpStatus.OK);
    }

    @GetMapping("/getAllInterviews")
    public List<Interview> getAllInterviews() {
        return interviewService.getAllInterviews();
    }
}