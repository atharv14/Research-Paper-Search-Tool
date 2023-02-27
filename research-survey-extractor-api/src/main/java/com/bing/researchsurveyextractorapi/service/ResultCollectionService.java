package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.ResultCollection;

import java.util.List;

public interface ResultCollectionService {

    void createResultCollection(ResultCollection collection);
    ResultCollection getResultCollection(String collectionID);
    List<ResultCollection> getResultCollections(String projectID);
    ResultCollection updateResultCollection(String collectionID, ResultCollection collection);
    ResultCollection deleteResultCollection(String collectionID);
}
