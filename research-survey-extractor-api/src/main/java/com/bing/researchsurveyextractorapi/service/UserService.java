package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.dto.UserDTO;
import com.bing.researchsurveyextractorapi.models.User;

import java.util.List;

public interface UserService {
    UserDTO authenticateUser(String username, String password);
    List<UserDTO> getAllUsers();
    UserDTO getUserByUsername(String username);
    UserDTO getUserByEmail(String email);
    void createUser(User user);
    void updatePassword(User user, String oldPassword, String newPassword);
    void updateUserDetails(User user);
    boolean checkUserExistsByUsername(String username);
    boolean checkUserExistsByEmail(String email);
}
