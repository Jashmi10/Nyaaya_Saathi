package com.example.NS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Controller
public class LawSearchController {

    private final String FLASK_API_URL = "http://127.0.0.1:5000/analyze";

    @PostMapping("/search-laws")
    public String searchLaws(@RequestParam("situation") String situation, Model model) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String jsonBody = "{ \"situation\": \"" + situation.replace("\"", "\\\"") + "\" }";
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

            // ✅ Expect a list instead of map
            ResponseEntity<List> response =
                    restTemplate.postForEntity(FLASK_API_URL, entity, List.class);

            List<Map<String, Object>> laws = response.getBody();
            model.addAttribute("laws", laws);
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "Failed to analyze your situation. Please try again.");
        }

        return "index";
        // or index.html if that's your main page
    }
}
