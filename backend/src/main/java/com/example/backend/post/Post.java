package com.example.backend.post;

import lombok.Builder;
import lombok.Getter;

import java.time.ZonedDateTime;

@Builder
@Getter
public class Post {
    private long id;
    private String title;
    private String author;
    private ZonedDateTime createdAt;
}
