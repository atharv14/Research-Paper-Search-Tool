package com.bing.researchsurveyextractorapi.controllers;

import com.bing.researchsurveyextractorapi.models.Collection;
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
    public List<Collection> getResultCollection() {
        return Arrays.asList(new Collection(1L, "1", null));
    }

    @GetMapping("/{collectionID}")
    public Collection getResultCollection(@PathVariable String collectionID) {
        return resultCollectionService.getResultCollection(collectionID);
    }

    @GetMapping("/project/{projectID}")
    public List<Collection> getResultCollections(@PathVariable String projectID) {
        return resultCollectionService.getResultCollections(projectID);
    }

    @PostMapping("")
    public void createResultCollection(Collection collection) {
        resultCollectionService.createResultCollection(collection);
    }

    @PutMapping("/{collectionID}")
    public void updateResultCollection(@PathVariable String collectionID, Collection collection) {
        resultCollectionService.updateResultCollection(collectionID, collection);
    }

    @DeleteMapping("/{collectionID}")
    public void deleteResultCollection(@PathVariable String collectionID) {
        resultCollectionService.deleteResultCollection(collectionID);
    }
}
