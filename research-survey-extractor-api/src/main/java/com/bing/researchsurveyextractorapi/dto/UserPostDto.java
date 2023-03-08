package com.bing.researchsurveyextractorapi.dto;

import com.bing.researchsurveyextractorapi.models.UserRole;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserPostDto {

    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
    private UserRole userRole;

}
