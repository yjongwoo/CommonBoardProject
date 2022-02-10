package com.example.backend.user;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@EqualsAndHashCode
public class SignupRequest {
    private String email;
    private String password;
    private String nickname;
}
