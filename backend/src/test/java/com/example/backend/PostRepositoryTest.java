package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.ZonedDateTime;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;

@DataJpaTest
class PostRepositoryTest {

    @Autowired
    private PostRepository repository;

    @Test
    void test_findAllPosts_returnsPosts() {
        PostEntity firstPostEntity = PostEntity.builder()
                .id(1)
                .title("Some title")
                .author("Some author")
                .createdAt(ZonedDateTime.now())
                .build();
        PostEntity secondPostEntity = PostEntity.builder()
                .id(2)
                .title("Some title2")
                .author("Some author2")
                .createdAt(ZonedDateTime.now())
                .build();
        List<PostEntity> postEntities = List.of(firstPostEntity, secondPostEntity);
        repository.saveAll(postEntities);


        List<PostEntity> result = repository.findAll();


        assertThat(result.get(0).getId(), equalTo(firstPostEntity.getId()));
        assertThat(result.get(0).getTitle(), equalTo(firstPostEntity.getTitle()));
        assertThat(result.get(0).getAuthor(), equalTo(firstPostEntity.getAuthor()));
        assertThat(result.get(0).getCreatedAt(), equalTo(firstPostEntity.getCreatedAt()));
    }
}
