package com.example.backend.user;

import com.example.backend.user.entity.UserEntity;
import com.example.backend.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    void test_save_create_user() {
        UserEntity newUser = new UserEntity();
        newUser.setEmail("email@gmail.com");
        newUser.setPassword("somePassword");
        newUser.setNickname("someNickname");


        UserEntity savedUser = userRepository.save(newUser);
        UserEntity foundUser = userRepository.findById(savedUser.getId()).orElse(null);


        assertEquals("email@gmail.com", foundUser.getEmail());
        assertEquals("somePassword", foundUser.getPassword());
        assertEquals("someNickname", foundUser.getNickname());
    }
}
