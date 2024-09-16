package com.seeder.userservice.controller;

import com.seeder.userservice.dto.*;
import com.seeder.userservice.exception.UserNotFoundException;
import com.seeder.userservice.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {


    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserRequest> getUserByEmail(@PathVariable String email) throws UserNotFoundException {
        log.info(">>> User Controller : getUserByEmail " + email);
        UserRequest userDto = userService.getUserByEmail(email);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping
    public ResponseEntity<UserRequest> createUser(@Valid @RequestBody UserRequest userDto) {
        log.info(">>> User Controller : createUser " + userDto.toString());
        UserRequest savedUser = userService.createUser(userDto);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/{email}")
    public ResponseEntity<UserRequest> updateUser(@PathVariable String email, @RequestBody UserRequest userDto) throws UserNotFoundException {
        log.info(">>> User Controller : updateUser " + userDto.toString());
        UserRequest updatedUser = userService.updateUser(email, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/validateToken")
    public ResponseEntity<ErrorResponse> validateToken(@RequestBody TokenRequest tokenRequest) {
        log.info(">>> User Controller : validateToken " + tokenRequest.toString());
        userService.validateToken(tokenRequest);
        return ResponseEntity.ok().body(new ErrorResponse(HttpStatus.OK.value(), HttpStatus.OK.name(), "Token is valid"));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> loginUser(@RequestBody AuthRequest authRequest) {
        log.info(">>> User Controller : login " + authRequest.toString());
        return new ResponseEntity<>(userService.loginUser(authRequest), HttpStatus.OK);
    }
}