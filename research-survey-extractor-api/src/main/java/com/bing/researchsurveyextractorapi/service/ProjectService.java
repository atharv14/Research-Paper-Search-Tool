package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.dto.ProjectPostDto;
import com.bing.researchsurveyextractorapi.models.Project;
import com.bing.researchsurveyextractorapi.models.User;

import java.util.List;

public interface ProjectService {
    List<Project> loadAllProjectsForUser(String username);

    Project loadProjectByID(Long projectID);

    Project createProject(ProjectPostDto dto, User user);

    void updateProject(Long Long, ProjectPostDto project);

    void deleteProject(Long projectID);
}
