package com.seeder.userservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponse {
    private int userId;
    private String name;
    private String email;
    private double creditBalance;
    private String token;
}
