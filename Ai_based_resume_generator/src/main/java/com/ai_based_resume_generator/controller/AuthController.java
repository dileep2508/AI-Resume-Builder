package com.ai_based_resume_generator.controller;

import com.ai_based_resume_generator.model.User;
import com.ai_based_resume_generator.repository.UserRepository;
import com.ai_based_resume_generator.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUtil jwtUtil;

	// ================= REGISTER =================

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user) {

		// CHECK EMAIL EXISTS

		if (userRepository.findByEmail(user.getEmail()).isPresent()) {

			return ResponseEntity.badRequest().body("Email Already Exists");
		}

		// ENCODE PASSWORD

		user.setPassword(passwordEncoder.encode(user.getPassword()));

		userRepository.save(user);

		return ResponseEntity.ok("User Registered Successfully");
	}

	// ================= LOGIN =================

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {

		User existingUser = userRepository.findByEmail(user.getEmail())
				.orElseThrow(() -> new RuntimeException("User Not Found"));

		boolean matches = passwordEncoder.matches(user.getPassword(), existingUser.getPassword());

		if (!matches) {

			return ResponseEntity.badRequest().body("Invalid Password");
		}

		// GENERATE TOKEN

		String token = jwtUtil.generateToken(existingUser.getEmail());

		// RETURN JSON

		Map<String, String> response = new HashMap<>();

		response.put("token", token);

		response.put("message", "Login Successful");

		return ResponseEntity.ok(response);
	}
}