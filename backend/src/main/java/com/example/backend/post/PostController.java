package com.example.backend.post;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PostController {

    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping(path = {"/posts"})
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

}
