package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.exceptions.QueryNotFoundException;
import com.bing.researchsurveyextractorapi.mapper.QueryMapper;
import com.bing.researchsurveyextractorapi.mapper.SearchResultMapper;
import com.bing.researchsurveyextractorapi.models.Category;
import com.bing.researchsurveyextractorapi.models.Project;
import com.bing.researchsurveyextractorapi.models.Query;
import com.bing.researchsurveyextractorapi.models.SearchResult;
import com.bing.researchsurveyextractorapi.pojo.query.QueryRequest;
import com.bing.researchsurveyextractorapi.pojo.searchresult.SearchResultUpdateRequest;
import com.bing.researchsurveyextractorapi.repository.ProjectRepository;
import com.bing.researchsurveyextractorapi.repository.QueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QueryServiceImpl implements QueryService {

    private final QueryRepository queryRepository;
    private final ProjectRepository projectRepository;

    @Override
    public List<Query> loadQueriesByProjectId(long projectId) {
        return queryRepository.findByProjectProjectId(projectId);
    }

    @Override
    public Query loadQuery(long queryId) {
        return queryRepository.findById(queryId).orElseThrow(() -> new QueryNotFoundException(queryId));
    }

    @Override
    public Query createQuery(QueryRequest request) {
        Project project = projectRepository.getById(request.getProjectId());
        Collection<Category> categories = project.getCategories();
        Query query = QueryMapper.toQuery(request, project, categories);
        query.getSearchResults().forEach(searchResult -> searchResult.setQuery(query));
        return queryRepository.save(query);
    }

    @Override
    public void deleteQuery(long queryId) {
        queryRepository.deleteById(queryId);
    }

    @Override
    public void patchSearchResults(long queryId, List<SearchResultUpdateRequest> resultUpdateRequests) {
        Query query = queryRepository.findById(queryId).orElseThrow(() -> new QueryNotFoundException(queryId));
        Collection<Category> categories = query.getProject().getCategories();
        List<SearchResult> searchResultList = resultUpdateRequests.stream()
                .map(resultUpdateRequest -> SearchResultMapper.toSearchResult(resultUpdateRequest, categories))
                .collect(Collectors.toList());
        query.getSearchResults().clear();
        query.setSearchResults(searchResultList);
        queryRepository.save(query);
    }
}
