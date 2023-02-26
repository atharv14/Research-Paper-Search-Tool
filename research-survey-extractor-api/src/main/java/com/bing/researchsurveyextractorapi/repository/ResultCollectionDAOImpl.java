package com.bing.researchsurveyextractorapi.repository;

import com.bing.researchsurveyextractorapi.models.ResultCollection;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Optional;

public class ResultCollectionDAOImpl implements ResultCollectionDAO {

    private final JdbcTemplate jdbcTemplate;

    public ResultCollectionDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<ResultCollection> getAllResultCollections() {
        String sql = "SELECT collection_id, ";
        return null;
    }

    @Override
    public Optional<ResultCollection> getResultCollectionByID(int collectionID) {
        return Optional.empty();
    }

    @Override
    public void saveResultCollection(ResultCollection resultCollection) {

    }

    @Override
    public void updateResultCollection(ResultCollection updatedResultCollection) {

    }

    @Override
    public void deleteResultCollectionByID(int collectionID) {

    }
}
