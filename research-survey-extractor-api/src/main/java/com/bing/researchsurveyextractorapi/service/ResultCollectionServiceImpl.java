package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.Collection;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultCollectionServiceImpl implements ResultCollectionService {
    @Override
    public void createResultCollection(Collection collection) {

    }

    @Override
    public Collection getResultCollection(String collectionID) {
        return null;
    }

    @Override
    public List<Collection> getResultCollections(String projectID) {
        return null;
    }

    @Override
    public Collection updateResultCollection(String collectionID, Collection collection) {
        return null;
    }

    @Override
    public Collection deleteResultCollection(String collectionID) {
        return null;
    }
}
