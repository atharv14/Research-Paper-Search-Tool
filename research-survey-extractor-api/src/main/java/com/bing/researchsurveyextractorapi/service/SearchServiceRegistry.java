package com.bing.researchsurveyextractorapi.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class SearchServiceRegistry {

    private static final SearchServiceRegistry instance = new SearchServiceRegistry();

    public static SearchServiceRegistry getInstance() {
        return instance;
    }

    private final Map<String, SearchService> searchServiceMap;

    private SearchServiceRegistry() {
        searchServiceMap = new ConcurrentHashMap<>();
    }

    public void addSearchService(SearchService service) {
        searchServiceMap.put(service.getServiceName(), service);
    }

    public SearchService getSearchService(String serviceName) {
        return searchServiceMap.get(serviceName);
    }
}
