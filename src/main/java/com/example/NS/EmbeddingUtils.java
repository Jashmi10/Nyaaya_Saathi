package com.example.NS;

import java.util.List;

public class EmbeddingUtils {

    // Method to compute cosine similarity between two embedding vectors
    public static double cosineSimilarity(List<Double> vec1, List<Double> vec2) {
        double dot = 0.0, norm1 = 0.0, norm2 = 0.0;
        for (int i = 0; i < vec1.size(); i++) {
            dot += vec1.get(i) * vec2.get(i);
            norm1 += vec1.get(i) * vec1.get(i);
            norm2 += vec2.get(i) * vec2.get(i);
        }
        return dot / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }
}
