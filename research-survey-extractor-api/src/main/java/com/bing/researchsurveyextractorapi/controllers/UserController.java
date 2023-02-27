package com.bing.researchsurveyextractorapi.controllers;

import com.bing.researchsurveyextractorapi.dto.UserDTO;
import com.bing.researchsurveyextractorapi.models.User;
import com.bing.researchsurveyextractorapi.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${API_V1_URI}/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/authenticate")
    public UserDTO authenticateUser(@RequestParam String username, @RequestParam String password) {
        return userService.authenticateUser(username, password);
    }

    @GetMapping("")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{username}")
    public UserDTO getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping("/email/{email}")
    public UserDTO getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("")
    public void registerUser(User user) {
        userService.createUser(user);
    }

    @PutMapping("")
    public void updateUserDetails(User user) {
        userService.updateUserDetails(user);
    }

    @PostMapping("/changePassword")
    public void changePassword(String oldPassword, String newPassword) {
        userService.updatePassword(null, oldPassword, newPassword);
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
