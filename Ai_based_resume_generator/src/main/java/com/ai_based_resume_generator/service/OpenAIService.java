	package com.ai_based_resume_generator.service;


import org.springframework.stereotype.Service;

@Service
public class OpenAIService {

    public String generateObjective(String role) {

        return "Motivated and detail-oriented " + role +
                " seeking an opportunity to contribute technical skills and grow professionally.";
    }
}