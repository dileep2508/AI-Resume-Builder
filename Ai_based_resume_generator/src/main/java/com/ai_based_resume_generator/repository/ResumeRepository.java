package com.ai_based_resume_generator.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ai_based_resume_generator.model.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

}