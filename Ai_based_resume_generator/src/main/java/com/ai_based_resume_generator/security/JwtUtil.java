package com.ai_based_resume_generator.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET =
            "mysecretkeymysecretkeymysecretkey";

    private static final Key KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    // GENERATE TOKEN

    public String generateToken(String username) {

        return Jwts.builder()

                .setSubject(username)

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60 * 24
                        )
                )

                .signWith(KEY, SignatureAlgorithm.HS256)

                .compact();
    }

    // EXTRACT USERNAME

    public String extractUsername(String token) {

        return getClaims(token).getSubject();
    }

    // VALIDATE TOKEN

    public boolean validateToken(
            String token,
            String username) {

        String extractedUsername =
                extractUsername(token);

        return extractedUsername.equals(username)
                && !isTokenExpired(token);
    }

    // CHECK EXPIRATION

    private boolean isTokenExpired(String token) {

        return getClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // GET CLAIMS

    private Claims getClaims(String token) {

        return Jwts.parserBuilder()

                .setSigningKey(KEY)

                .build()

                .parseClaimsJws(token)

                .getBody();
    }

	public boolean validateToken(String token, UserDetails userDetails) {
		// TODO Auto-generated method stub
		return false;
	}
}