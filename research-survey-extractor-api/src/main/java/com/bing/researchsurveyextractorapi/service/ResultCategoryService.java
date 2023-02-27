package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.ResultCategory;

import java.util.List;

public interface ResultCategoryService {

    List<ResultCategory> getResultCategories(String projectID);
    ResultCategory getResultCategory(String categoryID);
    void createResultCategory(String projectID, ResultCategory[] categories);
    void addResultCategory(String projectID, ResultCategory category);
    void updateResultCategory(String categoryID, ResultCategory category);
    void deleteResultCategory(String categoryID);

}
