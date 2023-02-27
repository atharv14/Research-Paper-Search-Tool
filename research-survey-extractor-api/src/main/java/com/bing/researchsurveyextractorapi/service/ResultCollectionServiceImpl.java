package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.ResultCollection;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultCollectionServiceImpl implements ResultCollectionService {
    @Override
    public void createResultCollection(ResultCollection collection) {

    }

    @Override
    public ResultCollection getResultCollection(String collectionID) {
        return null;
    }

    @Override
    public List<ResultCollection> getResultCollections(String projectID) {
        return null;
    }

    @Override
    public ResultCollection updateResultCollection(String collectionID, ResultCollection collection) {
        return null;
    }

    @Override
    public ResultCollection deleteResultCollection(String collectionID) {
        return null;
    }
}
