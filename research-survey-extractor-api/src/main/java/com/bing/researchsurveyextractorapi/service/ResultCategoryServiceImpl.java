package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultCategoryServiceImpl implements ResultCategoryService {
    @Override
    public List<Category> getResultCategories(String projectID) {
        return null;
    }

    @Override
    public Category getResultCategory(String categoryID) {
        return null;
    }

    @Override
    public void createResultCategory(String projectID, Category[] categories) {

    }

    @Override
    public void addResultCategory(String projectID, Category category) {

    }

    @Override
    public void updateResultCategory(String categoryID, Category category) {

    }

    @Override
    public void deleteResultCategory(String categoryID) {

    }
}
