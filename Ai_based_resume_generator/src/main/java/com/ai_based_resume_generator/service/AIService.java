//package com.ai_based_resume_generator.service;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//@Service
//public class AIService {
//
//    @Value("${openai.api.key}")
//    private String openAiKey;
//
//    public String generateSummary(String prompt) {
//
//        try {
//
//            String url = "https://api.openai.com/v1/chat/completions";
//
//            RestTemplate restTemplate = new RestTemplate();
//
//            HttpHeaders headers = new HttpHeaders();
//
//            headers.setContentType(MediaType.APPLICATION_JSON);
//
//            headers.setBearerAuth(openAiKey);
//
//            Map<String, Object> body = new HashMap<>();
//
//            body.put("model", "gpt-4o-mini");
//
//            body.put("messages", new Object[] {
//                    Map.of(
//                            "role", "user",
//                            "content", prompt
//                    )
//            });
//
//            HttpEntity<Map<String, Object>> request =
//                    new HttpEntity<>(body, headers);
//
//            ResponseEntity<Map> response =
//                    restTemplate.exchange(
//                            url,
//                            HttpMethod.POST,
//                            request,
//                            Map.class
//                    );
//
//            Map choice =
//                    (Map) ((java.util.List)
//                            response.getBody().get("choices"))
//                            .get(0);
//
//            Map message =
//                    (Map) choice.get("message");
//
//            return message.get("content").toString();
//
//        } catch (Exception e) {
//
//            e.printStackTrace();
//
//            return "OpenAI Error : " + e.getMessage();
//        }
//    }
//}

package com.ai_based_resume_generator.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIService {

	@Value("${gemini.api.url}")
	private String apiUrl;

	@Value("${gemini.api.key}")
	private String apiKey;

	public String generateSummary(String prompt) {

		try {

			RestTemplate restTemplate = new RestTemplate();

			HttpHeaders headers = new HttpHeaders();

			headers.setContentType(MediaType.APPLICATION_JSON);

			Map<String, Object> text = new HashMap<>();

			text.put("text", prompt);

			Map<String, Object> part = new HashMap<>();

			part.put("parts", List.of(text));

			Map<String, Object> requestBody = new HashMap<>();

			requestBody.put("contents", List.of(part));

			HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

			String finalUrl = apiUrl + apiKey;

			ResponseEntity<String> response = restTemplate.exchange(finalUrl, HttpMethod.POST, entity, String.class);

			ObjectMapper mapper = new ObjectMapper();

			JsonNode root = mapper.readTree(response.getBody());

			return root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();

		} catch (HttpClientErrorException.TooManyRequests e) {

			return "Gemini API quota exceeded. Please try again later.";

		} catch (HttpClientErrorException e) {

			return "HTTP Error : " + e.getStatusCode();

		} catch (Exception e) {

			return "Error : " + e.getMessage();
		}
	}
}