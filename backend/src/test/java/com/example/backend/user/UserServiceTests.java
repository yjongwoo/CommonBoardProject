package com.example.backend.user;

import com.example.backend.user.dto.response.TokenResponse;
import com.example.backend.user.entity.UserEntity;
import com.example.backend.user.dto.request.SignInRequest;
import com.example.backend.user.dto.request.SignupRequest;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.user.service.DefaultUserService;
import com.example.backend.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTests {

    private UserService userService;
    private UserRepository spyUserRepository;

    @BeforeEach
    void setUp() {
        spyUserRepository = mock(UserRepository.class);
        userService = new DefaultUserService(spyUserRepository);
    }

    @Test
    void test_createUser_callsRepositorySave() {
        String email = "email@gmail.com";
        String password = "somePassword";
        String nickname = "nickname";
        SignupRequest request = new SignupRequest(email, password, nickname);
        when(spyUserRepository.save(any())).thenReturn(new UserEntity());


        userService.createUser(request);


        verify(spyUserRepository).save(any());
    }

    @Test
    void test_validateUser_returnsTokenResponse() {
        when(spyUserRepository.findByEmail(any())).thenReturn(Optional.of(new UserEntity()));

        TokenResponse response = userService.validateUser(new SignInRequest("email@gmail.com", "somePassword"));

        verify(spyUserRepository).findByEmail(any());
        assertNotNull(response);
    }
}
