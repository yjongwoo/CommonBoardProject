package com.example.backend.user.service;

import com.example.backend.user.dto.request.SignInRequest;
import com.example.backend.user.dto.request.SignupRequest;
import com.example.backend.user.dto.response.TokenResponse;
import com.example.backend.user.dto.response.UserResponse;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public UserResponse createUser(SignupRequest request);
    public TokenResponse validateUser(SignInRequest signInRequest);
}
