package com.seeder.apigateway.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserResponse {
    private Integer userId;
    private String fullName;
    private String email;
    private double balance;
}