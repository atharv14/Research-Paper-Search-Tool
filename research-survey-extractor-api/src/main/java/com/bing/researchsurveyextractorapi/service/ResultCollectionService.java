package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.Collection;

import java.util.List;

public interface ResultCollectionService {

    void createResultCollection(Collection collection);

    Collection getResultCollection(String collectionID);

    List<Collection> getResultCollections(String projectID);

    Collection updateResultCollection(String collectionID, Collection collection);

    Collection deleteResultCollection(String collectionID);
}
