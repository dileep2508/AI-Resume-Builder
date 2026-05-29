package com.ai_based_resume_generator.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;



import io.jsonwebtoken.ExpiredJwtException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String token = null;

        // ================= GET TOKEN =================

        if (authorizationHeader != null &&
                authorizationHeader.startsWith("Bearer ")) {

            token = authorizationHeader.substring(7);

            try {

                username = jwtUtil.extractUsername(token);

            } catch (ExpiredJwtException e) {

                System.out.println("JWT Token Expired");

                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

                response.getWriter().write("Token Expired");

                return;

            } catch (Exception e) {

                System.out.println("Invalid JWT Token");

                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

                response.getWriter().write("Invalid Token");

                return;
            }
        }

        // ================= VALIDATE TOKEN =================

        if (username != null &&
                SecurityContextHolder.getContext()
                        .getAuthentication() == null) {

            UserDetails userDetails =
                    customUserDetailsService
                            .loadUserByUsername(username);

            if (jwtUtil.validateToken(token, userDetails)) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());

                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request));

                SecurityContextHolder.getContext()
                        .setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}