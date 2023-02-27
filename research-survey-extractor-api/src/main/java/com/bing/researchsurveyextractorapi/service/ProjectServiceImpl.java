package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.Project;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Override
    public List<Project> getAllProjectsForUser(String username) {
        return null;
    }

    @Override
    public Project getProjectByID(String projectID) {
        return null;
    }

    @Override
    public void createProject(Project project) {

    }

    @Override
    public void updateProject(String projectID, Project project) {

    }

    @Override
    public Project deleteProject(String projectID) {
        return null;
    }
}
