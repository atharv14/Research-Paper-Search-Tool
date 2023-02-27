package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.Project;

import java.util.List;

public interface ProjectService {
    List<Project> getAllProjectsForUser(String username);
    Project getProjectByID(String projectID);
    void createProject(Project project);
    void updateProject(String projectId, Project project);
    Project deleteProject(String projectID);
}
