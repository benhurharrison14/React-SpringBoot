package com.seeder.userservice.service.impl;

import com.seeder.userservice.dto.*;
import com.seeder.userservice.entity.User;
import com.seeder.userservice.exception.UserAlreadyExistsException;
import com.seeder.userservice.exception.UserNotFoundException;
import com.seeder.userservice.mapper.UserMapper;
import com.seeder.userservice.repository.UserRepository;
import com.seeder.userservice.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
    public class UserServiceImpl implements UserService {

        private final UserMapper userMapper;


        private final UserRepository userRepository;


        private final PasswordEncoder passwordEncoder;

        private final JwtService jwtService;


        private final AuthenticationManager authenticationManager;

    public UserServiceImpl(UserMapper userMapper, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
        public UserRequest getUserByEmail(String email) throws UserNotFoundException {
            Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));
            if(user.isPresent()) {
                return userMapper.convertEntityToDto(user.get());
            }

            throw new UserNotFoundException("User not found for email "+email);
        }

    @Override
    public UserRequest updateUser(String email, UserRequest userDto) throws UserNotFoundException {
        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));
        if(user.isEmpty()){
            throw new UserNotFoundException("User not found for email "+email);
        }
        User existingUser = user.get();
        if(userDto.getCreditBalance() != 0.0) {
            existingUser.setCreditBalance(userDto.getCreditBalance());
        }
        if(userDto.getPassword() != null){
            existingUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        User updatedUser = userRepository.save(existingUser);
        return userMapper.convertEntityToDto(updatedUser);

    }

    @Override
    public UserRequest createUser(UserRequest userDto) {
        if(userRepository.existsByEmail(userDto.getEmail())){
            throw new UserAlreadyExistsException("user Already Exists with email : "+userDto.getEmail());
        }
        User user = userMapper.convertDtoToEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return userMapper.convertEntityToDto(savedUser);
    }

    @Override
    public void validateToken(TokenRequest tokenResponse) {
        jwtService.isTokenValid(tokenResponse.getToken());
    }

    @Override
    public TokenResponse loginUser(AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );
        User user=userRepository.findByEmail(authRequest.getEmail());
        String jwtToken=jwtService.generateToken(user);
        return new TokenResponse(user.getUserId(),user.getName(),user.getEmail(),user.getCreditBalance(),jwtToken);

    }
}