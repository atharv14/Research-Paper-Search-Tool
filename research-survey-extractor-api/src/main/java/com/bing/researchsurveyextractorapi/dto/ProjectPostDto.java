package com.bing.researchsurveyextractorapi.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProjectPostDto {

    @NonNull
    private String projectName;

    @NonNull
    private String description;

}
