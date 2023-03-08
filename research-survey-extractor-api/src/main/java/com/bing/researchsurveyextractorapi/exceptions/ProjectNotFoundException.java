package com.bing.researchsurveyextractorapi.exceptions;

public class ProjectNotFoundException extends RuntimeException {

    public ProjectNotFoundException(Long projectID) {
        super("No project with project id: " + projectID + " exists!");
    }
}
