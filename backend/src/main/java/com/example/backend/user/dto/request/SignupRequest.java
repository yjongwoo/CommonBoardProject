package com.example.backend.user.dto.request;

import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    public void encryptPassword(final PasswordEncoder encoder) {
        this.password = encoder.encode(password);
    }
}
