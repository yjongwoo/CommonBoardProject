package com.example.backend.user.dto.request;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SignInRequest {
    private String email;
    private String password;
}
