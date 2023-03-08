package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.dto.UserPostDto;
import com.bing.researchsurveyextractorapi.dto.UserPutDto;
import com.bing.researchsurveyextractorapi.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> loadAllUsers();

    User loadUser(Long userId);

    User loadUserByUsername(String username);

    User loadUserByEmail(String email);

    User createUser(UserPostDto user);

    void changePassword(String username, String newPassword);

    void updateUserDetails(Long userId, UserPutDto dto);

    boolean checkUserExistsByUsername(String username);

    boolean checkUserExistsByEmail(String email);

}
