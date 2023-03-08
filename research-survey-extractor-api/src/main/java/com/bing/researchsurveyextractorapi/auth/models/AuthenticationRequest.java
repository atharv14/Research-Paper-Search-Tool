package com.bing.researchsurveyextractorapi.auth.models;


import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AuthenticationRequest {
    private String username;
    private String password;
}
