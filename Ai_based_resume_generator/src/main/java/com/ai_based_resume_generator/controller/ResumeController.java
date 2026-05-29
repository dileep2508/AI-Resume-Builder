package com.ai_based_resume_generator.controller;

import com.ai_based_resume_generator.dto.OpenAIRequest;
import com.ai_based_resume_generator.model.Resume;
import com.ai_based_resume_generator.service.AIService;
import com.ai_based_resume_generator.service.PdfService;
import com.ai_based_resume_generator.service.ResumeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private AIService aiService;

    // ================= SAVE RESUME =================

    @PostMapping
    public ResponseEntity<?> saveResume(
            @RequestBody Resume resume
    ) {

        try {

            Resume savedResume =
                    resumeService.saveResume(resume);

            return ResponseEntity.ok(savedResume);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Error Saving Resume : " + e.getMessage());
        }
    }

    // ================= GET ALL =================

    @GetMapping
    public ResponseEntity<?> getAllResumes() {

        try {

            List<Resume> resumes =
                    resumeService.getAllResumes();

            return ResponseEntity.ok(resumes);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Error Fetching Resumes : " + e.getMessage());
        }
    }

    // ================= GET BY ID =================

    @GetMapping("/{id}")
    public ResponseEntity<?> getResume(
            @PathVariable Long id
    ) {

        try {

            Resume resume =
                    resumeService.getResumeById(id);

            return ResponseEntity.ok(resume);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Resume Not Found : " + e.getMessage());
        }
    }

    // ================= UPDATE =================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateResume(
            @PathVariable Long id,
            @RequestBody Resume resume
    ) {

        try {

            Resume existingResume =
                    resumeService.getResumeById(id);

            existingResume.setFullName(
                    resume.getFullName()
            );

            existingResume.setEmail(
                    resume.getEmail()
            );

            existingResume.setPhone(
                    resume.getPhone()
            );

            existingResume.setGithub(
                    resume.getGithub()
            );

            existingResume.setLinkedin(
                    resume.getLinkedin()
            );

            existingResume.setPortfolio(
                    resume.getPortfolio()
            );

            existingResume.setProfileImage(
                    resume.getProfileImage()
            );

            existingResume.setSummary(
                    resume.getSummary()
            );

            existingResume.setSkills(
                    resume.getSkills()
            );

            existingResume.setEducation(
                    resume.getEducation()
            );

            existingResume.setExperience(
                    resume.getExperience()
            );

            existingResume.setProjects(
                    resume.getProjects()
            );

            existingResume.setLanguages(
                    resume.getLanguages()
            );

            existingResume.setHobbies(
                    resume.getHobbies()
            );

            Resume updatedResume =
                    resumeService.saveResume(existingResume);

            return ResponseEntity.ok(updatedResume);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Error Updating Resume : " + e.getMessage());
        }
    }

    // ================= DELETE =================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResume(
            @PathVariable Long id
    ) {

        try {

            resumeService.deleteResume(id);

            return ResponseEntity.ok(
                    "Resume Deleted Successfully"
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Error Deleting Resume : " + e.getMessage());
        }
    }

    // ================= AI SUMMARY =================

    @PostMapping("/generate-summary")
    public ResponseEntity<?> generateSummary(
            @RequestBody String skills
    ) {

        try {

            String response =
                    aiService.generateSummary(skills);

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("AI Error : " + e.getMessage());
        }
    }

    // ================= AI CHAT =================

    @PostMapping("/chat")
    public ResponseEntity<?> chatWithAI(
            @RequestBody OpenAIRequest request
    ) {

        try {

            String response =
                    aiService.generateSummary(
                            request.getPrompt()
                    );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Chat AI Error : " + e.getMessage());
        }
    }

    // ================= DOWNLOAD PDF =================

    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadResume(
            @PathVariable Long id
    ) {

        try {

            Resume resume =
                    resumeService.getResumeById(id);

            ByteArrayInputStream pdf =
                    pdfService.generatePdf(resume);

            HttpHeaders headers =
                    new HttpHeaders();

            headers.add(
                    "Content-Disposition",
                    "attachment; filename=resume.pdf"
            );

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(
                            MediaType.APPLICATION_PDF
                    )
                    .body(
                            new InputStreamResource(pdf)
                    );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("PDF Error : " + e.getMessage());
        }
    }
}