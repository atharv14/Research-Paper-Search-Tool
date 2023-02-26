package com.bing.researchsurveyextractorapi.repository;

import com.bing.researchsurveyextractorapi.models.ResultCollection;

import java.util.List;
import java.util.Optional;

public interface ResultCollectionDAO {

    List<ResultCollection> getAllResultCollections();
    Optional<ResultCollection> getResultCollectionByID(int collectionID);
    void saveResultCollection(ResultCollection resultCollection);
    void updateResultCollection(ResultCollection updatedResultCollection);
    void deleteResultCollectionByID(int collectionID);
}
