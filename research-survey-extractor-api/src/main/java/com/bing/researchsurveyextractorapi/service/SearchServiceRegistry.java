package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.DatasourceApi;

import javax.xml.crypto.Data;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class SearchServiceRegistry {

    private static final SearchServiceRegistry instance = new SearchServiceRegistry();

    public static SearchServiceRegistry getInstance() {
        return instance;
    }

    private final Map<DatasourceApi, SearchService> searchServiceMap;

    private SearchServiceRegistry() {
        searchServiceMap = new ConcurrentHashMap<>();
    }

    public void addSearchService(SearchService service) {
        searchServiceMap.put(service.getServiceName(), service);
    }

    public SearchService getSearchService(DatasourceApi serviceName) {
        return searchServiceMap.get(serviceName);
    }
}
