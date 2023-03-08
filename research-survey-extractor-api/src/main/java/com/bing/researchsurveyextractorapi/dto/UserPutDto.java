package com.bing.researchsurveyextractorapi.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserPutDto {

    private String firstName;
    private String lastName;
    private String email;

}
