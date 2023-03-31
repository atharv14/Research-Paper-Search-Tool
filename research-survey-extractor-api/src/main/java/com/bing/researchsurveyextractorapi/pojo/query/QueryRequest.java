package com.bing.researchsurveyextractorapi.pojo.query;

import com.bing.researchsurveyextractorapi.pojo.searchresult.SearchResultRequest;
import lombok.*;

import java.util.Collection;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QueryRequest {
    private String searchText;
    private long projectId;
    private Map<String, Collection<SearchResultRequest>> searchResults;
}
