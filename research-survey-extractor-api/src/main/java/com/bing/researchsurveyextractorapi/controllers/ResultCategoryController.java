package com.bing.researchsurveyextractorapi.controllers;

import com.bing.researchsurveyextractorapi.models.Category;
import com.bing.researchsurveyextractorapi.service.ResultCategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${API_V1_URI}/projects/categories")
public class ResultCategoryController {

    private final ResultCategoryService resultCategoryService;

    public ResultCategoryController(ResultCategoryService resultCategoryService) {
        this.resultCategoryService = resultCategoryService;
    }

    @GetMapping("/{categoryID}")
    public Category getResultCategory(@PathVariable String categoryID) {
        return resultCategoryService.getResultCategory(categoryID);
    }

    @GetMapping("/project/{projectID}")
    public List<Category> getResultCategories(@PathVariable String projectID) {
        return resultCategoryService.getResultCategories(projectID);
    }

    @PostMapping("")
    public void createResultCategories(@RequestParam String projectID, Category[] categories) {
        resultCategoryService.createResultCategory(projectID, categories);
    }

    @PutMapping("/{categoryID}")
    public void updateResultCategory(@PathVariable String categoryID, Category category) {
        resultCategoryService.updateResultCategory(categoryID, category);
    }

    @DeleteMapping("/{categoryID}")
    public void deleteResultCategory(@PathVariable String categoryID) {
        resultCategoryService.deleteResultCategory(categoryID);
    }

    @PatchMapping("/project/{projectID}")
    public void addResultCategory(@PathVariable String projectID, Category category) {
        resultCategoryService.addResultCategory(projectID, category);
    }
}
