package com.ai_based_resume_generator.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.ai_based_resume_generator.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}