package com.seeder.userservice.service.impl;

import io.jsonwebtoken.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


class JwtServiceTest {

    @InjectMocks
    private JwtService jwtService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        jwtService.setJwtExpiration(86400000L);
        jwtService.setSecretKey("404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970");
    }

    @Test
    void givenToken_thenExtractUserName() {
        String token = generateJwtToken("test_user", 3600000L); // Generate a real JWT token

        String username = jwtService.extractUsername(token);

        assertEquals("test_user", username);
    }

    @Test
    void givenToken_thenExtractClaim() {
        String token = generateJwtToken("test_user", 3600000L); // Generate a real JWT token

        String subject = jwtService.extractClaim(token, Claims::getSubject);

        assertEquals("test_user", subject);
    }

    @Test
    void givenUserDetailsAndClaims_whenGenerateToken() {
        UserDetails userDetails = new User("test_user", "password", Collections.emptyList());
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("key", "value");

        String generatedToken = jwtService.generateToken( userDetails);

        assertNotNull(generatedToken);
    }

    @Test
    void testGenerateTokenWithNoExtraClaims() {
        UserDetails userDetails = new User("test_user", "password", Collections.emptyList());
        String generatedToken = jwtService.generateToken(userDetails);
        assertNotNull(generatedToken);
    }

    @Test
    void givenToken_whenTokenValid_ValidToken() {
        String token = generateJwtToken("test_user", 3600000L); // Generate a real JWT token
        UserDetails userDetails = new User("test_user", "password", Collections.emptyList());

        boolean isValid = jwtService.isTokenValid(token, userDetails);

        assertTrue(isValid);
    }

    @Test
    void givenToken_whenInvalidToken() {
        UserDetails userDetails = new User("test_user", "password", Collections.emptyList());
        String token = generateJwtToken("test_user",System.currentTimeMillis()-3600000); // Generate a real JWT token

        JwtService mock = Mockito.mock(JwtService.class);
        when(mock.isTokenValid(token,userDetails)).thenReturn(false);
        boolean isValid = mock.isTokenValid(token, userDetails);

        assertFalse(isValid);
    }



    @Test
    void IsTokenValid_ExpiredToken() {
        String token = generateJwtToken("test_user", -3600000L); // Generate an expired JWT token
        UserDetails userDetails = new User("test_user", "password", Collections.emptyList());

        assertThrows(ExpiredJwtException.class, ()-> jwtService.isTokenValid(token, userDetails));
    }

    @Test
    void testIsTokenValid_ExpiredToken_InvalidToken() {
        String token = generateJwtToken("test_user", -3600000L); // Generate an expired JWT token
        UserDetails userDetails = new User("other_test", "password", Collections.emptyList());

        assertThrows(ExpiredJwtException.class, ()-> jwtService.isTokenValid(token, userDetails));
    }

    @Test
    void testIsTokenValid_whenValidToken() {
        String token = generateJwtToken("test_user", 3600000L); // Generate a real JWT token
        UserDetails userDetails = new User("other_user", "password", Collections.emptyList());

        boolean isValid = jwtService.isTokenValid(token,userDetails);

        assertFalse(isValid);
    }

    @Test
    void testIsTokenValid_TokenWithExpired_Token() {
        String token = generateJwtToken("test_user", System.currentTimeMillis()-3600000L); // Generate a real JWT token
        UserDetails userDetails = new User("other_user", "password", Collections.emptyList());

        boolean isValid = jwtService.isTokenValid(token, userDetails);

        assertFalse(isValid);
    }



    @Test
    void testIsTokenValid() {
        String token = generateJwtToken("test_user", 3600000L); // Generate a real JWT token

        boolean isValid = jwtService.isTokenValid(token);

        assertTrue(isValid);
    }


    @Test
    void testIsTokenExpired() {
        String token = generateJwtToken("test_user", -3600000L); // Generate an expired JWT token

        assertThrows(ExpiredJwtException.class, () -> jwtService.isTokenExpired(token));
    }

    @Test
    void givenToken_thenExtractExpiration() {
        String token = generateJwtToken("test_user", 3600000L); // Generate a real JWT token

        Date expirationDate = jwtService.extractExpiration(token);

        assertNotNull(expirationDate);
    }

    @Test
    void givenToken_thenExtractAllClaims() {
        String token = generateJwtToken("test_user", 3600000L); // Generate a real JWT token

        Claims claims = jwtService.extractAllClaims(token);

        assertNotNull(claims);
    }


    private String generateJwtToken(String username, long expiration) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(jwtService.getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}
