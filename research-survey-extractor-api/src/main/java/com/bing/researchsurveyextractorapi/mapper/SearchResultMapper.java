package com.bing.researchsurveyextractorapi.mapper;

import com.bing.researchsurveyextractorapi.exceptions.CategoryDoesNotExistException;
import com.bing.researchsurveyextractorapi.models.Category;
import com.bing.researchsurveyextractorapi.models.SearchResult;
import com.bing.researchsurveyextractorapi.pojo.searchresult.SearchResultDto;
import com.bing.researchsurveyextractorapi.pojo.searchresult.SearchResultRequest;
import com.bing.researchsurveyextractorapi.pojo.searchresult.SearchResultUpdateRequest;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class SearchResultMapper {

    private SearchResultMapper() {
        throw new IllegalStateException("Mapper class");
    }

    public static List<SearchResultDto> toDto(Collection<SearchResult> searchResults) {
        return searchResults
                .stream()
                .map(SearchResultMapper::toDto)
                .collect(Collectors.toList());
    }

    private static SearchResultDto toDto(SearchResult searchResult) {
        return SearchResultDto.builder()
                .resultId(searchResult.getResultId())
                .category(searchResult.getCategory().getCategoryId())
                .data(searchResult.getData())
                .build();
    }

    public static List<SearchResult> toSearchResults(Collection<SearchResultRequest> requests, Collection<Category> categories) {
        return requests
                .stream()
                .map(result -> SearchResultMapper.toSearchResult(result, categories))
                .collect(Collectors.toList());
    }

    private static SearchResult toSearchResult(SearchResultRequest request, Collection<Category> categories) {
        return SearchResult.builder()
                .data(request.getData())
                .category(
                        categories.stream()
                                .filter(category -> category.getPriority() == request.getCategory())
                                .findAny()
                                .orElseThrow(() -> new CategoryDoesNotExistException(request.getCategory()))
                )
                .build();
    }

    public static SearchResult toSearchResult(SearchResultUpdateRequest request, Collection<Category> categories) {
        return SearchResult.builder()
                .resultId(request.getResultId())
                .data(request.getData())
                .category(
                        categories.stream()
                                .filter(category -> category.getPriority() == request.getCategory())
                                .findAny()
                                .orElseThrow(() -> new CategoryDoesNotExistException(request.getCategory()))
                )
                .build();
    }
}
