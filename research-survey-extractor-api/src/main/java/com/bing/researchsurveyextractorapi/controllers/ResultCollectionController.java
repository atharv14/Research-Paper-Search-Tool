package com.bing.researchsurveyextractorapi.controllers;

import com.bing.researchsurveyextractorapi.models.ResultCollection;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/${API_VERSION_V1}/collections")
public class ResultCollectionController {

    @GetMapping(path = "")
    public List<ResultCollection> getResultCollection() {
        return Arrays.asList(new ResultCollection(1, "1", null));
    }
}
