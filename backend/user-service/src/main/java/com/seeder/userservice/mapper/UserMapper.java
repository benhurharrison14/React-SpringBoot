package com.seeder.userservice.mapper;

import com.seeder.userservice.dto.UserRequest;
import com.seeder.userservice.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    private final ModelMapper modelMapper;


    public UserMapper() {
        this.modelMapper = new ModelMapper();
    }

    public User convertDtoToEntity(UserRequest userRequest){
        return modelMapper.map(userRequest,User.class);
    }

    public UserRequest convertEntityToDto(User user){
        return modelMapper.map(user, UserRequest.class);
    }
}
