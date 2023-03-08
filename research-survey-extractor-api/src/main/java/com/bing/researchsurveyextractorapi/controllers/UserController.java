package com.bing.researchsurveyextractorapi.controllers;

import com.bing.researchsurveyextractorapi.dto.UserDTO;
import com.bing.researchsurveyextractorapi.dto.UserPostDto;
import com.bing.researchsurveyextractorapi.dto.UserPutDto;
import com.bing.researchsurveyextractorapi.mapper.UserMapper;
import com.bing.researchsurveyextractorapi.models.User;
import com.bing.researchsurveyextractorapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${API_V1_URI}/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("")
    public List<UserDTO> getAllUsers() {
        return userService.loadAllUsers()
                .stream()
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("{userId}")
    public UserDTO getUser(@PathVariable Long userId) {
        return UserMapper.toDto(userService.loadUser(userId));
    }

    @GetMapping("/{username}")
    public UserDTO getUserByUsername(@PathVariable String username) {
        User user = userService.loadUserByUsername(username);
        return UserMapper.toDto(user);
    }

    @GetMapping("/email/{email}")
    public UserDTO getUserByEmail(@PathVariable String email) {
        User user = userService.loadUserByEmail(email);
        return UserMapper.toDto(user);
    }

    @PostMapping("")
    public void registerUser(UserPostDto dto) {
        userService.createUser(dto);
    }

    @PutMapping("/{userId}")
    public void updateUserDetails(@PathVariable Long userId, UserPutDto dto) {
        userService.updateUserDetails(userId, dto);
    }

    @GetMapping("/exists/{username}")
    public boolean checkUserExistsByUsername(@PathVariable String username) {
        return userService.checkUserExistsByUsername(username);
    }

    @GetMapping("/exists/email/{email}")
    public boolean checkUserExistsByEmail(@PathVariable String email) {
        return userService.checkUserExistsByEmail(email);
    }
}
