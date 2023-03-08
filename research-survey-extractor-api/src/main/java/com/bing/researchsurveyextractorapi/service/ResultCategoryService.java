package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.Category;

import java.util.List;

public interface ResultCategoryService {

    List<Category> getResultCategories(String projectID);

    Category getResultCategory(String categoryID);

    void createResultCategory(String projectID, Category[] categories);

    void addResultCategory(String projectID, Category category);

    void updateResultCategory(String categoryID, Category category);

    void deleteResultCategory(String categoryID);

}
