package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PostEntity {
    @Id
    private long id;

    @Column
    private String title;

    @Column
    private String author;

    @Column
    private ZonedDateTime createdAt;

    public Post toDomain() {
        return Post.builder()
                .id(id)
                .title(title)
                .author(author)
                .createdAt(createdAt)
                .build();
    }
}
