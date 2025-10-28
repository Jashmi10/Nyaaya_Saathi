package com.example.NS.controller;
import com.example.NS.model.Law;
import com.example.NS.service.LawService;
import com.example.NS.embedding_service.EmbeddingResponse;
import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class LawSearchController {

    @Autowired
    private LawService lawService;

    private final String FASTAPI_URL = "http://127.0.0.1:8081/embed"; // Make sure FastAPI runs on this port

    @PostMapping("/search-laws")
    public String searchLaws(@RequestParam("situation") String situation, Model model) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Escape quotes in user input
            String jsonBody = "{ \"sentence\": \"" + situation.replace("\"", "\\\"") + "\" }";
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

            // Receive the response as Map<String, Object>
            ResponseEntity<Map> response = restTemplate.postForEntity("http://127.0.0.1:8081/embed", entity, Map.class);

            java.util.Map<String, Object> body = (java.util.Map<String, Object>) response.getBody();
            if (body == null || !body.containsKey("embedding")) {
                model.addAttribute("error", "Failed to get embedding from server.");
                return "result";
            }

            // Convert the embedding to List<Float>
            List<Double> doubleList = (List<Double>) body.get("embedding");  // FastAPI numbers come as Double
            List<Float> userEmbedding = doubleList.stream()
                    .map(Double::floatValue)
                    .collect(Collectors.toList());

            // Call your service to get top laws
            List<Law> topLaws = lawService.getTop10SimilarLaws(userEmbedding);
            model.addAttribute("laws", topLaws);

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "Failed to analyze your situation. Please try again.");
        }

        return "result";  // Thymeleaf template
    }
}
