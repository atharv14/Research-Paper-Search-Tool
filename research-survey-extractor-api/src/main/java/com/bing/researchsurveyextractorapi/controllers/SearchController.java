package com.bing.researchsurveyextractorapi.controllers;

import com.bing.researchsurveyextractorapi.models.DatasourceApi;
import com.bing.researchsurveyextractorapi.models.Document;
import com.bing.researchsurveyextractorapi.service.SearchServiceRegistry;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("${API_V1_URI}/search")
public class SearchController {

    @GetMapping("/{datasource}")
    public List<Document> search(@RequestParam String queryText, @PathVariable DatasourceApi datasource) {
        if (!datasource.isApiBased()) {
            throw new RuntimeException("Exception Handled");
        }
        return SearchServiceRegistry.getInstance().getSearchService(datasource).search(queryText);
    }

    @GetMapping("/datasources")
    public DatasourceApi[] fetchDataSources() {
        return DatasourceApi.values();
    }
}
