package com.seeder.userservice.service.impl;

import com.seeder.userservice.entity.User;
import com.seeder.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class AuthServiceTest {
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private AuthService authService;
    @BeforeEach
    public void setup() throws Exception{
        MockitoAnnotations.initMocks(this);
    }
    @Test
    void givenUserEmail_thenLoadUserByUsername(){
        User user=User.builder().name("raj@gmail.com").build();
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        UserDetails userDetails=authService.loadUserByUsername("username");
        assertEquals(user,userDetails);
    }

}