package com.example.NS.controller;

import com.example.NS.model.Lawyer;
import com.example.NS.repository.LawyerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lawyers")
@CrossOrigin
public class LawyerController {

    private final LawyerRepository lawyerRepository;

    public LawyerController(LawyerRepository lawyerRepository) {
        this.lawyerRepository = lawyerRepository;
    }

    // ✅ Search API
    @GetMapping("/search")
    public List<Lawyer> searchLawyers(@RequestParam String location) {
        return lawyerRepository.findByAdvocateAddressContainingIgnoreCase(location);
    }
}
