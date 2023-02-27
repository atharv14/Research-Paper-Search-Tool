package com.bing.researchsurveyextractorapi.models;

public class ResultCategory {

    private String categoryID;
    private int priority;
    private String label;
    private String color;

    public ResultCategory(String categoryID, int priority, String label, String color) {
        this.categoryID = categoryID;
        this.priority = priority;
        this.label = label;
        this.color = color;
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

    public String getCategoryID() {
        return categoryID;
    }
}
