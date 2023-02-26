package com.bing.researchsurveyextractorapi.models;

public class Project {

    private String projectID;
    private String projectName;
    private String description;
    private String projectOwner;
    private String[] collaborators;
    private Query[] queries;

    public Project(String projectID, String projectName, String description, String projectOwner, String[] collaborators, Query[] queries) {
        this.projectID = projectID;
        this.projectName = projectName;
        this.description = description;
        this.projectOwner = projectOwner;
        this.collaborators = collaborators;
        this.queries = queries;
    }

    public String getProjectID() {
        return projectID;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getDescription() {
        return description;
    }

    public String getProjectOwner() {
        return projectOwner;
    }

    public String[] getCollaborators() {
        return collaborators;
    }

    public Query[] getQueries() {
        return queries;
    }
}
