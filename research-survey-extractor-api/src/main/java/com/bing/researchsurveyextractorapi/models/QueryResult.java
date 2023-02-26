package com.bing.researchsurveyextractorapi.models;

public class QueryResult {

    private String resultID;
    private String[] data;

    public QueryResult(String resultID, String[] data) {
        this.resultID = resultID;
        this.data = data;
    }

    public String getResultID() {
        return resultID;
    }

    public String[] getData() {
        return data;
    }
}
