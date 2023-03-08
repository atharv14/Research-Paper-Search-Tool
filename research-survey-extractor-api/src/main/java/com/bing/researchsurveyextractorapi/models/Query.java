package com.bing.researchsurveyextractorapi.models;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Query {

    @Id
    @GeneratedValue
    private Long queryId;

    @Column(nullable = false)
    private String searchText;

    @Column(nullable = false)
    private String datasource;

    @ManyToMany
    @JoinTable(
            name = "query_results",
            joinColumns = @JoinColumn(name = "query_id"),
            inverseJoinColumns = @JoinColumn(name = "result_id")
    )
    @ToString.Exclude
    private Collection<Result> results;

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
