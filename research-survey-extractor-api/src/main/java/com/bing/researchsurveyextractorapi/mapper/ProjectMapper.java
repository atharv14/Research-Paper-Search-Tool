package com.bing.researchsurveyextractorapi.mapper;

import com.bing.researchsurveyextractorapi.dto.ProjectDto;
import com.bing.researchsurveyextractorapi.models.Project;
import com.bing.researchsurveyextractorapi.models.User;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectMapper {

    public static ProjectDto toDto(Project project) {
        return ProjectDto.builder()
                .projectId(project.getProjectId())
                .projectName(project.getProjectName())
                .description(project.getDescription())
                .owner(project.getOwner().getUsername())
                .collaborators(getCollaborators(project))
                .build();
    }

    private static List<String> getCollaborators(Project project) {
        return project.getCollaborators() == null ? Collections.emptyList() : project.getCollaborators().stream().map(User::getUsername).collect(Collectors.toList());
    }
}
