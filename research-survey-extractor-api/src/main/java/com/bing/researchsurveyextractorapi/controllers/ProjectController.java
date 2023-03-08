package com.bing.researchsurveyextractorapi.controllers;

import com.bing.researchsurveyextractorapi.dto.ProjectDto;
import com.bing.researchsurveyextractorapi.dto.ProjectPostDto;
import com.bing.researchsurveyextractorapi.mapper.ProjectMapper;
import com.bing.researchsurveyextractorapi.models.User;
import com.bing.researchsurveyextractorapi.service.ProjectService;
import com.bing.researchsurveyextractorapi.util.AuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${API_V1_URI}/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("")
    public List<ProjectDto> getAllProjects() {
        return projectService.loadAllProjectsForUser(AuthUtils.getLoggedInUsername())
                .stream()
                .map(ProjectMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{projectID}")
    public ProjectDto getProject(@PathVariable Long projectID) {
        return ProjectMapper.toDto(projectService.loadProjectByID(projectID));
    }

    @PostMapping("")
    public ProjectDto createProject(@RequestBody ProjectPostDto dto) {
        User user = AuthUtils.getLoggedInUser();
        return ProjectMapper.toDto(projectService.createProject(dto, user));
    }

    @PutMapping("/{projectID}")
    public void updateProject(@PathVariable Long projectID, @RequestBody ProjectPostDto dto) {
        projectService.updateProject(projectID, dto);
    }

    @DeleteMapping("/{projectID}")
    public void deleteProject(@PathVariable Long projectID) {
        projectService.deleteProject(projectID);
    }
}
