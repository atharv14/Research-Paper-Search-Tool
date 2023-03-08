package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.dto.ProjectPostDto;
import com.bing.researchsurveyextractorapi.exceptions.ProjectNotFoundException;
import com.bing.researchsurveyextractorapi.models.Project;
import com.bing.researchsurveyextractorapi.models.User;
import com.bing.researchsurveyextractorapi.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    final ProjectRepository projectRepository;
    final UserService userService;

    @Override
    public List<Project> loadAllProjectsForUser(String username) {
        return projectRepository.findByOwner_Username(username);
    }

    @Override
    public Project loadProjectByID(Long projectID) {
        return projectRepository.findById(projectID).orElseThrow(() -> new ProjectNotFoundException(projectID));
    }

    @Override
    public Project createProject(ProjectPostDto dto, User user) {
        return projectRepository.save(
                Project.builder()
                        .projectName(dto.getProjectName())
                        .description(dto.getDescription())
                        .owner(user)
                        .build()
        );
    }

    @Override
    public void updateProject(Long projectId, ProjectPostDto updatedProject) {
        if (projectRepository.existsById(projectId)) {
            String projectName = updatedProject.getProjectName();
            String description = updatedProject.getDescription();
            projectRepository.updateProjectNameAndDescriptionByProjectId(projectName, description, projectId);
        } else {
            throw new ProjectNotFoundException(projectId);
        }
    }

    @Override
    public void deleteProject(Long projectId) {
        if (projectRepository.existsById(projectId)) {
            projectRepository.deleteById(projectId);
        } else {
            throw new ProjectNotFoundException(projectId);
        }
    }
}
