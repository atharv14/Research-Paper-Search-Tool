package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.DatasourceApi;
import com.bing.researchsurveyextractorapi.models.Document;

import java.util.List;

public interface SearchService {

    String getServiceUrl();
    DatasourceApi getServiceName();
    void registerService();
    List<Document> search(String queryText);
}
