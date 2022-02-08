package com.example.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PostControllerTests {
    private MockMvc mockMvc;
    private PostService mockPostService;

    @BeforeEach
    void setUp() {
        mockPostService = mock(PostService.class);
        mockMvc = MockMvcBuilders
                .standaloneSetup(new PostController(mockPostService))
                .build();
    }

    @Test
    void test_getAllPosts_returnsOk() throws Exception {
        mockMvc.perform(get("/posts"))
                .andExpect(status().isOk());
    }

    @Test
    void test_getAllPosts_callsServiceWithGetAllPosts() throws Exception {
        mockMvc.perform(get("/posts"));


        verify(mockPostService).getAllPosts();
    }

    @Test
    public void test_getAllPosts_returnsPost() throws Exception {
        when(mockPostService.getAllPosts())
                .thenReturn(Collections.emptyList());


        String json = mockMvc.perform(get("/posts"))
                .andReturn()
                .getResponse()
                .getContentAsString();


        assertThat(json, equalTo("[]"));
    }
}
