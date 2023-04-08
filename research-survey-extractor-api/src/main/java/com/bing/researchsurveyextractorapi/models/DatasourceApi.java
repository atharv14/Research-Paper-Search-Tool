package com.bing.researchsurveyextractorapi.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DatasourceApi {
    SCOPUS("scopus", true),
    PUBMED("pubmed", true),
    WOS("wos", true),
    IEEE("ieee", true),
    MANUAL("manual", false);

    private final String name;
    private final boolean isApiBased;
}
