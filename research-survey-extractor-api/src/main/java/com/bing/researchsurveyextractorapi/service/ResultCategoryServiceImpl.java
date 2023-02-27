package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.ResultCategory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultCategoryServiceImpl implements ResultCategoryService {
    @Override
    public List<ResultCategory> getResultCategories(String projectID) {
        return null;
    }

    @Override
    public ResultCategory getResultCategory(String categoryID) {
        return null;
    }

    @Override
    public void createResultCategory(String projectID, ResultCategory[] categories) {

    }

    @Override
    public void addResultCategory(String projectID, ResultCategory category) {

    }

    @Override
    public void updateResultCategory(String categoryID, ResultCategory category) {

    }

    @Override
    public void deleteResultCategory(String categoryID) {

    }
}
