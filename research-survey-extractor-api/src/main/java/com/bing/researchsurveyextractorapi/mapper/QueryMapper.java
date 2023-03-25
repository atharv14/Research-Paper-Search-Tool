package com.bing.researchsurveyextractorapi.mapper;

import com.bing.researchsurveyextractorapi.models.Category;
import com.bing.researchsurveyextractorapi.models.DatasourceApi;
import com.bing.researchsurveyextractorapi.models.Project;
import com.bing.researchsurveyextractorapi.models.Query;
import com.bing.researchsurveyextractorapi.pojo.query.QueryDto;
import com.bing.researchsurveyextractorapi.pojo.query.QueryRequest;

import java.util.Collection;


public class QueryMapper {

    private QueryMapper() {
        throw new IllegalStateException("Mapper class");
    }

    public static QueryDto toDto(Query query) {
        return QueryDto.builder()
                .queryId(query.getQueryId())
                .datasource(query.getDatasource())
                .searchText(query.getSearchText())
                .searchResults(SearchResultMapper.toDto(query.getSearchResults()))
                .build();
    }

    public static Query toQuery(QueryRequest request, Project project, Collection<Category> categories) {
        return Query.builder()
                .datasource(DatasourceApi.valueOf(request.getDatasource()))
                .searchText(request.getSearchText())
                .project(project)
                .searchResults(SearchResultMapper.toSearchResults(request.getSearchResults(), categories))
                .build();
    }
}
