package com.bing.researchsurveyextractorapi.models;

public class Query {

    private String queryID;
    private String searchText;
    private String datasource;
    private QueryResult[] results;

    public Query(String queryID, String searchText, String datasource, QueryResult[] results) {
        this.queryID = queryID;
        this.searchText = searchText;
        this.datasource = datasource;
        this.results = results;
    }

    public String getQueryID() {
        return queryID;
    }

    public String getSearchText() {
        return searchText;
    }

    public String getDatasource() {
        return datasource;
    }

    public QueryResult[] getResults() {
        return results;
    }
}
