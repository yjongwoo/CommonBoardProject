package com.example.backend.user.controller;

import com.example.backend.user.dto.response.TokenResponse;
import com.example.backend.user.dto.response.UserResponse;
import com.example.backend.user.service.DefaultUserService;
import com.example.backend.user.service.UserService;
import com.example.backend.user.dto.request.SignInRequest;
import com.example.backend.user.dto.request.SignupRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping(path = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserResponse signup(@RequestBody SignupRequest request) {
        request.encryptPassword(passwordEncoder);
        return userService.createUser(request);
    }

    @PostMapping(path = "/signIn", consumes = MediaType.APPLICATION_JSON_VALUE)
    public TokenResponse signIn(@RequestBody SignInRequest request) {
        return userService.validateUser(request);
    }

}
