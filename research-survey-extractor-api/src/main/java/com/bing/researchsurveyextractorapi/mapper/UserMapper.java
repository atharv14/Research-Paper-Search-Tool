package com.bing.researchsurveyextractorapi.mapper;

import com.bing.researchsurveyextractorapi.dto.UserDTO;
import com.bing.researchsurveyextractorapi.dto.UserPostDto;
import com.bing.researchsurveyextractorapi.models.User;

public class UserMapper {


    public static User fromPostDto(UserPostDto userDetails) {
        return User
                .builder()
                .firstName(userDetails.getFirstName())
                .lastName(userDetails.getLastName())
                .email(userDetails.getEmail())
                .username(userDetails.getUsername())
                .password(userDetails.getPassword())
                .role(userDetails.getUserRole())
                .build();
    }

    public static UserDTO toDto(User user) {
        return UserDTO.builder()
                .userId(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .username(user.getUsername())
                .build();
    }
}
