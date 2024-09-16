package com.seeder.userservice.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserRequest {
    private int userId;

    @NotNull
    @Size(min = 2, message = "name can not contain less than 2 letters")
    private String name;

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotNull
    @Positive(message = "Credit Balance can not be negative")
    private double creditBalance;
}