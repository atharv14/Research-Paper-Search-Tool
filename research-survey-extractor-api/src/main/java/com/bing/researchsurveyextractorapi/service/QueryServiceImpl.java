package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QueryServiceImpl implements QueryService {
    @Override
    public List<Query> getQueries(String projectID) {
        return null;
    }

    @Override
    public Query getQuery(String queryID) {
        return null;
    }

    @Override
    public void createQuery(Query query) {

    }

    @Override
    public void updateQuery(String queryID, Query query) {

    }

    @Override
    public void deleteQuery(String queryID) {

    }
}
