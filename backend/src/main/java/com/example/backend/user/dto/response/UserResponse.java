package com.example.backend.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserResponse {
    private long userId;
    private String email;
    private String nickname;
}
