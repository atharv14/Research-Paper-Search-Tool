package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.Query;

import java.util.List;

public interface QueryService {

    List<Query> getQueries(String projectID);
    Query getQuery(String queryID);
    void createQuery(Query query);
    void updateQuery(String queryID, Query query);
    void deleteQuery(String queryID);
}
