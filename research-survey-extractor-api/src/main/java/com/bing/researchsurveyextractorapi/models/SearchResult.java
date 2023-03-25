package com.bing.researchsurveyextractorapi.models;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "search_results")
public class SearchResult implements Serializable {

    @Id
    @GeneratedValue
    private Long resultId;

    @Column(nullable = false)
    private String data;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(optional = false)
    @JoinColumn(name = "query_id", nullable = false)
    @ToString.Exclude
    private Query query;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SearchResult searchResult = (SearchResult) o;
        return getResultId() != null && Objects.equals(getResultId(), searchResult.getResultId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(resultId);
    }
}
