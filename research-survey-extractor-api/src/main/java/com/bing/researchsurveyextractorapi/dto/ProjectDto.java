package com.bing.researchsurveyextractorapi.dto;

import lombok.*;

import java.util.Collection;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProjectDto {

    private Long projectId;
    private String projectName;
    private String description;
    private String owner;
    private Collection<String> collaborators;

}
