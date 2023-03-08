package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.dto.UserPostDto;
import com.bing.researchsurveyextractorapi.dto.UserPutDto;
import com.bing.researchsurveyextractorapi.exceptions.UserDoesNotExistException;
import com.bing.researchsurveyextractorapi.mapper.UserMapper;
import com.bing.researchsurveyextractorapi.models.User;
import com.bing.researchsurveyextractorapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<User> loadAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User loadUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserDoesNotExistException("userId", userId.toString()));
    }

    @Override
    public User loadUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserDoesNotExistException("username", username));
    }

    @Override
    public User loadUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserDoesNotExistException("email", email));
    }

    @Override
    public User createUser(UserPostDto userDetails) {
        User user = UserMapper.fromPostDto(userDetails);
        return userRepository.save(user);
    }


    @Override
    public void changePassword(String username, String newPassword) {
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        userRepository.updatePasswordByUsername(username, encodedNewPassword);
    }

    @Override
    public void updateUserDetails(Long userId, UserPutDto dto) {
        if (userRepository.existsById(userId)) {
            userRepository.updateFirstNameAndLastNameAndEmailByUserId(dto.getFirstName(), dto.getLastName(), dto.getEmail(), userId);
        } else {
            throw new UserDoesNotExistException("userId", userId.toString());
        }
    }

    @Override
    public boolean checkUserExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean checkUserExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}
