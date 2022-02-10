package com.example.backend.user;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(SignupRequest request) {
        UserEntity entity = UserEntity.builder()
                .email(request.getEmail())
                .email(request.getPassword())
                .email(request.getNickname())
                .build();
        userRepository.save(entity);
    }
}
