package com.seeder.userservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenRequest {
    private String token;
}
