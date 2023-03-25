package com.bing.researchsurveyextractorapi.pojo.query;

import com.bing.researchsurveyextractorapi.pojo.searchresult.SearchResultRequest;
import lombok.*;

import java.util.Collection;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QueryRequest {
    private String searchText;
    private String datasource;
    private long projectId;
    private Collection<SearchResultRequest> searchResults;
}
