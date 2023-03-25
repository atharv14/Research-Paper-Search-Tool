package com.bing.researchsurveyextractorapi.pojo.query;

import com.bing.researchsurveyextractorapi.models.DatasourceApi;
import com.bing.researchsurveyextractorapi.pojo.searchresult.SearchResultDto;
import lombok.*;

import java.util.Collection;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QueryDto {
    private long queryId;
    private String searchText;
    private DatasourceApi datasource;
    private Collection<SearchResultDto> searchResults;
}
