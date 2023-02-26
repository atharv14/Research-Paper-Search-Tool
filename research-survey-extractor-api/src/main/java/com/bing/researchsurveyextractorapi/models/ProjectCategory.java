package com.bing.researchsurveyextractorapi.models;

public class ProjectCategory {

    private int priority;
    private String label;
    private String color;
    private String projectID;

    public ProjectCategory(int priority, String label, String color, String projectID) {
        this.priority = priority;
        this.label = label;
        this.color = color;
        this.projectID = projectID;
    }

    public int getPriority() {
        return priority;
    }

    public String getLabel() {
        return label;
    }

    public String getColor() {
        return color;
    }

    public String getProjectID() {
        return projectID;
    }
}
