package com.bing.researchsurveyextractorapi.models;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.Objects;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "queries")
public class Query implements Serializable {

    @Id
    @GeneratedValue
    private Long queryId;

    @Column(nullable = false)
    private String searchText;

    @Column(nullable = false)
    private DatasourceApi datasource;

    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "query")
    private Collection<SearchResult> searchResults;

    @ManyToOne(optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    @ToString.Exclude
    private Project project;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Query query = (Query) o;
        return getQueryId() != null && Objects.equals(getQueryId(), query.getQueryId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(queryId, searchText, datasource);
    }
}
