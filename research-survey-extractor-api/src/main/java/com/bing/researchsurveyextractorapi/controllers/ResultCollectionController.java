package com.bing.researchsurveyextractorapi.controllers;

import com.bing.researchsurveyextractorapi.models.ResultCollection;
import com.bing.researchsurveyextractorapi.service.ResultCollectionService;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("${API_V1_URI}/collections")
public class ResultCollectionController {

    private ResultCollectionService resultCollectionService;

    public ResultCollectionController(ResultCollectionService resultCollectionService) {
        this.resultCollectionService = resultCollectionService;
    }

    @GetMapping(path = "")
    public List<ResultCollection> getResultCollection() {
        return Arrays.asList(new ResultCollection(1, "1", null));
    }

    @GetMapping("/{collectionID}")
    public ResultCollection getResultCollection(@PathVariable String collectionID) {
        return resultCollectionService.getResultCollection(collectionID);
    }

    @GetMapping("/project/{projectID}")
    public List<ResultCollection> getResultCollections(@PathVariable String projectID) {
        return resultCollectionService.getResultCollections(projectID);
    }

    @PostMapping("")
    public void createResultCollection(ResultCollection resultCollection) {
        resultCollectionService.createResultCollection(resultCollection);
    }

    @PutMapping("/{collectionID}")
    public void updateResultCollection(@PathVariable String collectionID, ResultCollection resultCollection) {
        resultCollectionService.updateResultCollection(collectionID, resultCollection);
    }

    @DeleteMapping("/{collectionID}")
    public void deleteResultCollection(@PathVariable String collectionID) {
        resultCollectionService.deleteResultCollection(collectionID);
    }
}
