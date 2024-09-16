package com.seeder.userservice.service;

import com.seeder.userservice.dto.*;
import com.seeder.userservice.entity.User;
import com.seeder.userservice.exception.ErrorResponse;
import com.seeder.userservice.exception.ExceptionHandlers;
import com.seeder.userservice.exception.UserAlreadyExistsException;
import com.seeder.userservice.exception.UserNotFoundException;
import com.seeder.userservice.mapper.UserMapper;
import com.seeder.userservice.repository.UserRepository;
import com.seeder.userservice.service.impl.JwtService;
import com.seeder.userservice.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;


    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    private String jwtToken = "mockToken";

    @Mock
    private AuthenticationManager authenticationManager;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getUserByEmail() throws Exception {

        String email = "john@example.com";
        User user = new User(1, "John Doe", email,"hello",1.25);

        when(userRepository.findByEmail(email)).thenReturn(user);

        UserRequest resultUser = userService.getUserByEmail(email);
        verify(userRepository, times(1)).findByEmail(email);

    }

    @Test
    void getUserByEmail_nonExistingUser() {

        String email = "john@example.com";

        when(userRepository.findByEmail(email)).thenReturn(null);

        assertThrows(UserNotFoundException.class, ()-> userService.getUserByEmail(email));
        verify(userRepository, times(1)).findByEmail(email);

    }

    @Test
    void updateUser_existingUser()  {

        String email = "john@example.com";
        String password = passwordEncoder.encode("Hello@123");
        User existingUser = new User(1, "John Doe", email,password,1.25);
        UserRequest userDto = new UserRequest(1, "John Doe", email,password,1.25);
        User updaterUser = new User(1, "John", email,password,1.25);
        UserRequest updaterUserDto = new UserRequest(1, "John", email,password,1.25);

        when(userRepository.findByEmail(email)).thenReturn(existingUser);
        when(userMapper.convertEntityToDto(existingUser)).thenReturn(userDto);
        when(userRepository.save(existingUser)).thenReturn(updaterUser);
        when(userMapper.convertEntityToDto(updaterUser)).thenReturn(updaterUserDto);

        UserRequest resultUser = userService.updateUser(email,updaterUserDto);
        verify(userRepository, times(1)).save(existingUser);
    }

    @Test
    void updateUserCreditBalance_existingUser()  {

        String email = "john@example.com";
        String password = "hello";
        String newPassword = "Hello!123";
        User existingUser = new User(1, "John Doe", email,password,1.25);
        UserRequest userDto = new UserRequest(1, "John Doe", email,password,1.25);
        User updaterUser = new User(1, "John", email,newPassword,0.0);
        UserRequest updaterUserDto = new UserRequest(1, "John", email,newPassword,0.0);

        when(userRepository.findByEmail(email)).thenReturn(existingUser);
        when(userMapper.convertEntityToDto(existingUser)).thenReturn(userDto);
        when(userRepository.save(existingUser)).thenReturn(updaterUser);
        when(userMapper.convertEntityToDto(updaterUser)).thenReturn(updaterUserDto);

        UserRequest resultUser = userService.updateUser(email,updaterUserDto);
        verify(userRepository, times(1)).save(existingUser);
    }




    @Test
    void updatedUser_nonExistingUser(){
        String email = "john@example.com";
        String password = passwordEncoder.encode("Hello@123");
        UserRequest userDto = new UserRequest(1, "John Doe", email,password,1.25);

        when(userRepository.findByEmail(email)).thenReturn(null);
        assertThrows(UserNotFoundException.class,()-> userService.updateUser(email,userDto));

        verify(userRepository, times(1)).findByEmail(email);

        verify(userRepository,Mockito.never()).save(any(User.class));

    }

    @Test
    void createUser() {
        String email = "john@example.com";
        String password = passwordEncoder.encode("Hello@123");
        User user = new User(1, "John Doe", email,password,1.25);
        UserRequest userDto= new UserRequest(1, "John Doe", email,password,1.25);

        when(userMapper.convertDtoToEntity(userDto)).thenReturn(user);
        when(userMapper.convertEntityToDto(user)).thenReturn(userDto);
        when(userRepository.save(user)).thenReturn(user);

        UserRequest createdUser = userService.createUser(userDto);
        Assertions.assertEquals(userDto.toString(),createdUser.toString());
    }

    @Test
    void createUser_existinguser(){
        String email = "john@example.com";
        String password = passwordEncoder.encode("Hello@123");
        UserRequest userDto = new UserRequest(1, "John Doe", email,password,1.25);
        when(userRepository.existsByEmail(userDto.getEmail())).thenReturn(true);
        UserAlreadyExistsException userAlreadyExistsException = new UserAlreadyExistsException("Cash kick already exists");
        ExceptionHandlers exceptionHandlers = new ExceptionHandlers();
        ResponseEntity<ErrorResponse> response = exceptionHandlers.handleException(userAlreadyExistsException);
        assertThrows(UserAlreadyExistsException.class, () -> userService.createUser(userDto));
        assertEquals(HttpStatus.FORBIDDEN.value(),response.getStatusCode().value());
    }

    @Test
    void givenInvalidUserDto_when_saveuser_ThrowsException(){
        String email = "john@example.com";
        String password = passwordEncoder.encode("Hello@123");
        UserRequest userDto = new UserRequest(1, "John Doe", email,password,1.25);
        User user = new User(1, "John Doe", email,password,1.25);

        when(userMapper.convertDtoToEntity(userDto)).thenReturn(user);
        when(userRepository.save(user)).thenThrow(new NullPointerException("Unable to save user"));

        NullPointerException exception = assertThrows(NullPointerException.class, () -> {
            userService.createUser(userDto);
        });

        Long time = System.currentTimeMillis();

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage("Unable to save user");
        errorResponse.setTimeStamp(time);
        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());

        Assertions.assertEquals(errorResponse.getMessage(),exception.getMessage());
        Assertions.assertEquals(errorResponse.getStatus(),HttpStatus.NOT_FOUND.value());
        Assertions.assertEquals(errorResponse.getTimeStamp(),time);
    }


    @Test
    void givenTokenRequest_whenTokenValid_thenPositiveResponse(){
        TokenRequest tokenDTO=new TokenRequest(jwtToken);
        when(jwtService.isTokenValid(tokenDTO.getToken())).thenReturn(true);
        userService.validateToken(tokenDTO);
        verify(jwtService).isTokenValid(tokenDTO.getToken());
    }

    @Test
    void givenAuthenticationRequest_whenUserCredentialsValid_testLoginUser(){
        User user = User.builder().userId(1).name("name").email("email").creditBalance(100.0).password("Password").build();
        AuthRequest authRequest=AuthRequest.builder().email("email").password("password").build();
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        when(jwtService.generateToken(user)).thenReturn(jwtToken);
        TokenResponse tokenResponse=userService.loginUser(authRequest);
        assertEquals(jwtToken,tokenResponse.getToken());
    }

    @Test
    void testConvertDtoToEntity() {
        UserMapper userMapper1 = new UserMapper();
        User user = User.builder().userId(1).name("name").email("email").creditBalance(100.0).password("Password").build();
        UserRequest userRequest = UserRequest.builder().userId(1).name("name").email("email").creditBalance(100.0).password("Password").build();

        User user1 = userMapper1.convertDtoToEntity(userRequest);

        assertEquals(user.getUserId(), user1.getUserId());
        assertEquals(user.getEmail(), user1.getEmail());
        assertEquals(user.getCreditBalance(), user1.getCreditBalance());
        assertEquals(user.getName(), user1.getName());
        assertEquals(user.getPassword(), user1.getPassword());

    }

    @Test
    void testConvertEntityToDto() {
        UserMapper userMapper1 = new UserMapper();
        User user = User.builder().userId(1).name("name").email("email").creditBalance(100.0).password("Password").build();
        UserRequest userRequest = UserRequest.builder().userId(1).name("name").email("email").creditBalance(100.0).password("Password").build();

        UserRequest userRequest1 = userMapper1.convertEntityToDto(user);

        assertEquals(userRequest.getUserId(), userRequest1.getUserId());
        assertEquals(userRequest.getEmail(), userRequest1.getEmail());
        assertEquals(userRequest.getCreditBalance(), userRequest1.getCreditBalance());
        assertEquals(userRequest.getName(), userRequest1.getName());
        assertEquals(userRequest.getPassword(), userRequest1.getPassword());
    }


}