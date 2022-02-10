package com.example.backend.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTests {

    private UserService userService;
    private UserRepository spyUserRepository;

    @BeforeEach
    void setUp() {
        spyUserRepository = mock(UserRepository.class);
        userService = new UserService(spyUserRepository);
    }

    @Test
    void test_createUser_calls_repository_save() {
        // given
        String email = "email@gmail.com";
        String password = "somePassword";
        String nickname = "nickname";
        SignupRequest request = new SignupRequest(email, password, nickname);
        when(spyUserRepository.save(any())).thenReturn(new UserEntity());

        // when
        userService.createUser(request);

        // then
        verify(spyUserRepository).save(any());
    }
}
