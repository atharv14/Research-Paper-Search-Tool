package com.bing.researchsurveyextractorapi.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class ResultCollection {

    private long collectionID;
    private String collectionName;
    private QueryResult[] results;

    public ResultCollection(long collectionID, String collectionName, QueryResult[] results) {
        this.collectionID = collectionID;
        this.collectionName = collectionName;
        this.results = results;
    }

    public ResultCollection() {

    }

    public long getCollectionID() {
        return collectionID;
    }

    public void setCollectionID(long collectionID) {
        this.collectionID = collectionID;
    }

    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    public QueryResult[] getResults() {
        return results;
    }

    public void setResults(QueryResult[] results) {
        this.results = results;
    }
}
