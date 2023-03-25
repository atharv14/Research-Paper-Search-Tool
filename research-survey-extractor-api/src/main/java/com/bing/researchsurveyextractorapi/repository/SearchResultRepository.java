package com.bing.researchsurveyextractorapi.repository;

import com.bing.researchsurveyextractorapi.models.SearchResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchResultRepository extends JpaRepository<SearchResult, Long> {
}