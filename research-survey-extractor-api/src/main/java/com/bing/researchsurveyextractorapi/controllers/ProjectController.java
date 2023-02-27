package com.bing.researchsurveyextractorapi.controllers;

import com.bing.researchsurveyextractorapi.models.Project;
import com.bing.researchsurveyextractorapi.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${API_V1_URI}/projects")
public class ProjectController {

    private ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("")
    public List<Project> getAllProjects() {
        return projectService.getAllProjectsForUser(null);
    }

    @GetMapping("/{projectID}")
    public Project getProject(@PathVariable String projectID) {
        return projectService.getProjectByID(projectID);
    }

    @PostMapping("")
    public void createProject(Project project) {
        projectService.createProject(project);
    }

    @PutMapping("/{projectID}")
    public void updateProject(@PathVariable String projectID, Project project) {
        projectService.updateProject(projectID, project);
    }

    @DeleteMapping("/{projectID}")
    public void deleteProject(@PathVariable String projectID) {
        projectService.deleteProject(projectID);
    }
}
