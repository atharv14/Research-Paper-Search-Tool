package com.bing.researchsurveyextractorapi.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DatasourceApi {
    SCOPUS("scopus"),
    PUBMED("pubmed"),
    WOS("wos"),
    IEEE("ieee"),
    MANUAL("manual");

    private final String name;
}
