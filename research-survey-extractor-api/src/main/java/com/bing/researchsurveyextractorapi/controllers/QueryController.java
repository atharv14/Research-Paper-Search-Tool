package com.bing.researchsurveyextractorapi.controllers;

import com.bing.researchsurveyextractorapi.models.Query;
import com.bing.researchsurveyextractorapi.service.QueryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${API_V1_URI}/projects/queries")
public class QueryController {

    private QueryService queryService;

    public QueryController(QueryService queryService) {
        this.queryService = queryService;
    }

    @GetMapping("/project/{projectID}")
    public List<Query> getQueries(@PathVariable String projectID) {
        return queryService.getQueries(projectID);
    }

    @GetMapping("/{queryID}")
    public Query getQuery(String queryID) {
        return queryService.getQuery(queryID);
    }

    @PostMapping("")
    public void saveQuery(Query query) {
        queryService.createQuery(query);
    }

    @PutMapping("/{queryID}")
    public void updateQuery(@PathVariable String queryID, Query query) {
        queryService.updateQuery(queryID, query);
    }

    @DeleteMapping("/{queryID}")
    public void deleteQuery(@PathVariable String queryID) {
        queryService.deleteQuery(queryID);
    }
}
