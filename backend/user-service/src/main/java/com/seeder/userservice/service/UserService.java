package com.seeder.userservice.service;

import com.seeder.userservice.dto.*;
import com.seeder.userservice.exception.UserNotFoundException;

public interface UserService {

    UserRequest getUserByEmail(String email) throws UserNotFoundException;

    UserRequest updateUser(String email, UserRequest userDto) throws UserNotFoundException;

    UserRequest createUser(UserRequest userDto);

    void validateToken(TokenRequest tokenRequest);

    TokenResponse loginUser(AuthRequest authRequest);
}
