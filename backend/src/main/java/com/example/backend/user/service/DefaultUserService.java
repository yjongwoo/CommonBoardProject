package com.example.backend.user.service;

import com.example.backend.user.repository.UserRepository;
import com.example.backend.user.dto.response.TokenResponse;
import com.example.backend.user.dto.response.UserResponse;
import com.example.backend.user.entity.UserEntity;
import com.example.backend.user.dto.request.SignInRequest;
import com.example.backend.user.dto.request.SignupRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DefaultUserService implements UserService {

    private final UserRepository userRepository;

    public UserResponse createUser(SignupRequest request) {
        UserEntity entity = UserEntity.builder()
                .email(request.getEmail())
                .email(request.getPassword())
                .email(request.getNickname())
                .build();
        UserEntity savedUser = userRepository.save(entity);
        return new UserResponse(savedUser.getId(), savedUser.getEmail(), savedUser.getNickname());
    }

    public TokenResponse validateUser(SignInRequest signinRequestDto) {
        UserEntity user = userRepository.findByEmail(signinRequestDto.getEmail()).orElse(null);
        if(user != null) {
            return new TokenResponse("someToken");
        } else {
            return null;
        }
    }
}
