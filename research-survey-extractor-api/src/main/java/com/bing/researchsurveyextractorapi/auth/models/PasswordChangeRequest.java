package com.bing.researchsurveyextractorapi.auth.models;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PasswordChangeRequest {
    private String oldPassword;
    private String newPassword;
}
