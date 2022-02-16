package com.example.backend.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class TokenResponse {
    private String accessToken;
}
