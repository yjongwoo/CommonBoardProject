package com.example.backend.user;

import com.example.backend.user.dto.request.SignInRequest;
import com.example.backend.user.dto.request.SignupRequest;
import com.example.backend.user.dto.response.TokenResponse;
import com.example.backend.user.dto.response.UserResponse;
import com.example.backend.user.service.UserService;

public class SpyUserService implements UserService {

    private String email;
    private String password;
    private String nickname;

    @Override
    public UserResponse createUser(SignupRequest request) {
        this.email = request.getEmail();
        this.password = request.getPassword();
        this.nickname = request.getNickname();
        return new UserResponse();
    }

    @Override
    public TokenResponse validateUser(SignInRequest signinRequestDto) {
        this.email = signinRequestDto.getEmail();
        this.password = signinRequestDto.getPassword();
        return new TokenResponse("someToken");
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getNickname() {
        return nickname;
    }
}
