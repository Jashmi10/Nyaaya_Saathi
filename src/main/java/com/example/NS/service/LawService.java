package com.example.NS.service;

import com.example.NS.model.Law;
import com.example.NS.repository.LawRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LawService {

    private final LawRepository lawRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public LawService(LawRepository lawRepository) {
        this.lawRepository = lawRepository;
    }

    // Cosine similarity between two vectors
    private double cosineSimilarity(List<Float> vec1, List<Float> vec2) {
        double dot = 0.0, normA = 0.0, normB = 0.0;
        for (int i = 0; i < vec1.size(); i++) {
            dot += vec1.get(i) * vec2.get(i);
            normA += Math.pow(vec1.get(i), 2);
            normB += Math.pow(vec2.get(i), 2);
        }
        return dot / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    // Get top 10 similar laws
    public List<Law> getTop10SimilarLaws(List<Float> userEmbedding) {
        List<Law> allLaws = lawRepository.findAll();

        return allLaws.stream()
                .map(law -> {
                    try {
                        // Convert stored embedding JSON string to List<Float>
                        List<Float> lawEmbedding = objectMapper.readValue(
                                law.getEmbedding(),
                                new TypeReference<List<Float>>() {}
                        );
                        double similarity = cosineSimilarity(userEmbedding, lawEmbedding);
                        return new AbstractMap.SimpleEntry<>(law, similarity);
                    } catch (Exception e) {
                        e.printStackTrace();
                        return new AbstractMap.SimpleEntry<>(law, -1.0);
                    }
                })
                .sorted((e1, e2) -> Double.compare(e2.getValue(), e1.getValue())) // highest similarity first
                .limit(10)
                .map(AbstractMap.SimpleEntry::getKey)
                .collect(Collectors.toList());
    }
}
