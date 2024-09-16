package com.seeder.userservice.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.seeder.userservice.dto.*;
import com.seeder.userservice.exception.ErrorResponse;
import com.seeder.userservice.exception.ExceptionHandlers;
import com.seeder.userservice.exception.UserAlreadyExistsException;
import com.seeder.userservice.exception.UserNotFoundException;
import com.seeder.userservice.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.bind.MethodArgumentNotValidException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = UserController.class,excludeAutoConfiguration = {SecurityAutoConfiguration.class})
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserServiceImpl userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    TokenRequest tokenRequest;
    private ObjectMapper mapper;

    @BeforeEach
    public void setup(){
        mapper = new ObjectMapper();
        tokenRequest = new TokenRequest("dummyToken");
    }


    @Test
    void getUserByEmailTest() throws Exception {
        String email = "john@example.com";
        UserRequest user = new UserRequest(1, "John Doe", email,passwordEncoder.encode("Password@123"),1.25);

        when(userService.getUserByEmail(email)).thenReturn(user);

        mockMvc.perform(get("/users/john@example.com").contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(tokenRequest))).andExpect(status().isOk());
    }

    @Test
    void getUsersByEmailTest_ThrowsException() throws Exception {
        String email = "john@example.com";
        UserNotFoundException exception = new UserNotFoundException("User not Found with email : "+email);
        ExceptionHandlers exceptionHandlers = new ExceptionHandlers();
        ResponseEntity<ErrorResponse> response = exceptionHandlers.handleException(exception);

        assertEquals(HttpStatus.NOT_FOUND.value(),response.getStatusCode().value());

    }

    @Test
    void createUser() throws Exception {
        String email = "john@example.com";
        String password = passwordEncoder.encode("Hello@123");
        UserRequest userRequest = new UserRequest(1, "John Doe", email,password,1.25);

        when(userService.createUser(userRequest)).thenReturn(userRequest);

        String payload = "{\"id\": 1, \"name\": \"rajesh Doe\", \"email\": \"rajesh@gmail.com\",\"password\":\"$2a$10$TqzNnZa////f4LOAVd4bn.dI5UL/xUWMamUdVPET5fNVkW9ZsAwlW\",\"creditBalance\": 4.35}";


        mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON).content(payload)).andExpect(status().isOk());
    }

    @Test
    void createUser_thorws_exception() throws Exception {
        String email = "john@example.com";
        String password = passwordEncoder.encode("Hello@123");
        UserRequest userRequest = new UserRequest(1, "", email,password,1.25);

        when(userService.createUser(userRequest)).thenReturn(userRequest);

        String payload = "{\"id\": 1, \"name\": \"\", \"email\": \"rajesh@gmail.com\",\"password\":\"$2a$10$TqzNnZa////f4LOAVd4bn.dI5UL/xUWMamUdVPET5fNVkW9ZsAwlW\",\"creditBalance\": 4.35}";


        mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON).content(payload)).andExpect(status().isBadRequest());
    }

    @Test
    void updateUser() throws Exception{
        String email = "john@example.com";
        String payload = "{\"id\": 1, \"name\": \"rajesh Doe\", \"email\": \"rajesh\", \"creditBalance\": 4.35}";
        UserRequest user = new UserRequest(1, "John Doe", email,passwordEncoder.encode("Password"),1.25);
        UserRequest updateUser = new UserRequest(1, "John Doe", email,passwordEncoder.encode("Password"),4.35);

        mockMvc.perform(put("/users/john@example.com").contentType(MediaType.APPLICATION_JSON).content(payload)).andExpect(status().isOk());
    }

    @Test
    void givenTokenRequest_whenTokenRequestValid_thenValidateToken() throws Exception {
        TokenRequest tokenRequest = new TokenRequest("dummyToken");
        doNothing().when(userService).validateToken(any(TokenRequest.class));
        mockMvc.perform(MockMvcRequestBuilders.
                        post("/users/validateToken")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(tokenRequest))
                        .accept(MediaType.APPLICATION_JSON)).
                andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void givenAuthRequest_whenUserIsValid_thenLoginUser() throws Exception {
        AuthRequest authRequest=new AuthRequest("email","password");
        TokenResponse token=new TokenResponse(1,"name","raj@gmail.com",12.0,"dummyToken");
        when(userService.loginUser(authRequest)).thenReturn(token);
        mockMvc.perform(MockMvcRequestBuilders.
                        post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(authRequest))
                        .accept(MediaType.APPLICATION_JSON)).
                andExpect(MockMvcResultMatchers.status().isOk());
    }

}