package com.example.backend.user;

import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserControllerTests {

    UserService spyUserService;
    MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        spyUserService = mock(UserService.class);
        mockMvc = MockMvcBuilders
                .standaloneSetup(new UserController(spyUserService))
                .build();
    }

    @Test
    void test_postSignup_api_with_requestBody() throws Exception {
        String email = "email@gmail.com";
        String password =  "somePassword";
        String nickname = "someNickname";

        JSONObject jsonObj = new JSONObject();
        jsonObj.put("email", email);
        jsonObj.put("password", password);
        jsonObj.put("nickname", nickname);

        SignupRequest request = new SignupRequest(email, password, nickname);
        mockMvc.perform(
                post("/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonObj.toString())
        ).andExpect(status().isOk());

        verify(spyUserService).createUser(request);
    }

}
