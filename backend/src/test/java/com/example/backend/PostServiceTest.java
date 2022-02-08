package com.example.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PostServiceTest {

    private PostService postService;
    private PostRepository mockRepository;

    @BeforeEach
    void setUp() {
        mockRepository = mock(PostRepository.class);
        postService = new PostService(mockRepository);
    }

    @Test
    void test_getAllPosts_returnEmptyPostList() {
        when(mockRepository.findAll()).thenReturn(Collections.emptyList());


        List<Post> posts = postService.getAllPosts();


        assertThat(posts, equalTo(Collections.emptyList()));
    }

    @Test
    void test_getAllPosts_callsRepositoryGetAllPosts() {
        SpyPostRepository spyPostRepository = new SpyPostRepository();
        postService = new PostService(spyPostRepository);


        postService.getAllPosts();


        assertTrue(spyPostRepository.getIsGetAllPostsCalled());
    }

    @Test
    void test_getAllPosts_returnSinglePost() {
        PostEntity post = PostEntity.builder()
                .id(1)
                .title("Some title")
                .author("Some author")
                .createdAt(ZonedDateTime.now())
                .build();
        List<PostEntity> posts = new ArrayList<>();
        posts.add(post);
        when(mockRepository.findAll()).thenReturn(posts);


        List<Post> result = postService.getAllPosts();


        assertEquals(1, result.size());
        assertEquals(post.getId(), result.get(0).getId());
        assertEquals(post.getTitle(), result.get(0).getTitle());
        assertEquals(post.getAuthor(), result.get(0).getAuthor());
        assertEquals(post.getCreatedAt(), result.get(0).getCreatedAt());
    }

    @Test
    void test_getAllPosts_returnMultiplePosts() {
        PostEntity post1 = PostEntity.builder()
                .id(1)
                .title("Some title")
                .author("Some author")
                .createdAt(ZonedDateTime.now())
                .build();
        PostEntity post2 = PostEntity.builder()
                .id(2)
                .title("Some title2")
                .author("Some author2")
                .createdAt(ZonedDateTime.now())
                .build();
        List<PostEntity> posts = List.of(post1, post2);
        when(mockRepository.findAll()).thenReturn(posts);


        List<Post> result = postService.getAllPosts();


        assertEquals(2, result.size());
        assertEquals(post1.getId(), result.get(0).getId());
        assertEquals(post1.getTitle(), result.get(0).getTitle());
        assertEquals(post1.getAuthor(), result.get(0).getAuthor());
        assertEquals(post1.getCreatedAt(), result.get(0).getCreatedAt());
        assertEquals(post2.getId(), result.get(1).getId());
        assertEquals(post2.getTitle(), result.get(1).getTitle());
        assertEquals(post2.getAuthor(), result.get(1).getAuthor());
        assertEquals(post2.getCreatedAt(), result.get(1).getCreatedAt());
    }
}
