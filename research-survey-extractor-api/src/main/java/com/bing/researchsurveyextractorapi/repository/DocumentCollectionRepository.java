package com.bing.researchsurveyextractorapi.repository;

import com.bing.researchsurveyextractorapi.models.DocumentCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

public interface DocumentCollectionRepository extends JpaRepository<DocumentCollection, Long> {
    @Transactional
    @Modifying
    @Query("update DocumentCollection d set d.collectionName = ?1 where d.collectionId = ?2")
    int updateCollectionNameByCollectionId(String collectionName, long collectionId);

    Collection<DocumentCollection> findByProjectProjectId(long projectId);

}
