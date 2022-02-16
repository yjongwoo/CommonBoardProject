package com.example.backend.user;

import com.example.backend.user.controller.UserController;
import com.example.backend.user.dto.request.SignInRequest;
import com.example.backend.user.dto.request.SignupRequest;
import com.example.backend.user.dto.response.TokenResponse;
import com.example.backend.user.dto.response.UserResponse;
import com.example.backend.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerTests {
    ObjectMapper mapper = new ObjectMapper();

    MockMvc mockMvc;
    PasswordEncoder passwordEncoder;

    @Spy
    UserService spyUserService;

    @BeforeEach
    void setUp() {
        passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        mockMvc = MockMvcBuilders
                .standaloneSetup(new UserController(spyUserService, passwordEncoder))
                .build();
    }

    @Test
    void test_signup_returnsOk() throws Exception {
        when(spyUserService.createUser(any())).thenReturn(new UserResponse(1, "email", "nickname"));


        String email = "email@gmail.com";
        String password = "somePassword";
        String nickname = "someNickname";
        SignupRequest request = new SignupRequest(email, password, nickname);
        mockMvc.perform(post("/signup")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        verify(spyUserService).createUser(any());
    }

    @Test
    void test_signUp_returnsId() throws Exception {
        String email = "email@gmail.com";
        String password = "somePassword";
        String nickname = "someNickname";
        when(spyUserService.createUser(any())).thenReturn(new UserResponse(1, email, nickname));


        SignupRequest request = new SignupRequest(email, password, nickname);
        String responseJson = mockMvc.perform(post("/signup")
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                ).andReturn()
                .getResponse()
                .getContentAsString();
        JSONObject jsonObject = new JSONObject(responseJson);


        assertEquals(1L, jsonObject.getLong("userId"));
        assertEquals(email, jsonObject.getString("email"));
        assertEquals(nickname, jsonObject.getString("nickname"));
    }

    @Test
    void test_signUp_passwordEncoding() throws Exception {
        String email = "email@gmail.com";
        String password = "somePassword";
        String nickname = "someNickname";
        when(spyUserService.createUser(any())).thenReturn(new UserResponse());


        SignupRequest request = new SignupRequest(email, password, nickname);
        mockMvc.perform(post("/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request))
        ).andExpect(status().isOk());
        request.encryptPassword(passwordEncoder);


        ArgumentCaptor<SignupRequest> arguments = ArgumentCaptor.forClass(SignupRequest.class);
        verify(spyUserService).createUser(arguments.capture());
        assertEquals(email, arguments.getValue().getEmail());
        assertTrue(passwordEncoder.matches(password, arguments.getValue().getPassword()));
        assertTrue(passwordEncoder.matches(password, request.getPassword()));
        assertNotEquals(password, arguments.getValue().getPassword());
        assertEquals(nickname, arguments.getValue().getNickname());
    }

    @Test
    void test_signIn_returnsOk() throws Exception {
        SignInRequest request = new SignInRequest("email@gmail.com", "somePassword");
        when(spyUserService.validateUser(any())).thenReturn(new TokenResponse("someToken"));
        mockMvc.perform(post("/signIn")
                .content(mapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    @Test
    void test_signIn_withUser() throws Exception {
        when(spyUserService.validateUser(any())).thenReturn(new TokenResponse("someToken"));
        String email = "email@gmail.com";
        String password = "somePassword";
        SignInRequest signInRequest = new SignInRequest(email, password);

        mockMvc.perform(post("/signIn")
                        .content(mapper.writeValueAsString(signInRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken", notNullValue()));


        ArgumentCaptor<SignInRequest> arguments = ArgumentCaptor.forClass(SignInRequest.class);
        verify(spyUserService).validateUser(arguments.capture());
        assertEquals(email, arguments.getValue().getEmail());
        assertEquals(password, arguments.getValue().getPassword());
    }
}
