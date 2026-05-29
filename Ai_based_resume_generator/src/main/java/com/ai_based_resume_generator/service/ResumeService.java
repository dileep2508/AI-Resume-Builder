package com.ai_based_resume_generator.service;

import com.ai_based_resume_generator.model.Resume;
import com.ai_based_resume_generator.repository.ResumeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeService {

	@Autowired
	private ResumeRepository resumeRepository;

	// SAVE

	public Resume saveResume(Resume resume) {

		return resumeRepository.save(resume);
	}

	// GET ALL

	public List<Resume> getAllResumes() {

		return resumeRepository.findAll();
	}

	// GET BY ID

	public Resume getResumeById(Long id) {

		return resumeRepository.findById(id).orElseThrow(() -> new RuntimeException("Resume Not Found"));
	}

	// DELETE

	public void deleteResume(Long id) {

		resumeRepository.deleteById(id);
	}
}