package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.dto.UserDTO;
import com.bing.researchsurveyextractorapi.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public UserDTO authenticateUser(String username, String password) {
        return null;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return null;
    }

    @Override
    public UserDTO getUserByUsername(String username) {
        return null;
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        return null;
    }

    @Override
    public void createUser(User user) {

    }

    @Override
    public void updatePassword(User user, String oldPassword, String newPassword) {

    }

    @Override
    public void updateUserDetails(User user) {

    }

    @Override
    public boolean checkUserExistsByUsername(String username) {
        return false;
    }

    @Override
    public boolean checkUserExistsByEmail(String email) {
        return false;
    }
}
