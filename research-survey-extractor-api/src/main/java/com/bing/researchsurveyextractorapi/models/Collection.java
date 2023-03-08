package com.bing.researchsurveyextractorapi.models;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Collection {

    @Id
    @GeneratedValue
    private Long collectionId;

    @Column(nullable = false)
    private String collectionName;

    @ManyToMany
    @JoinTable(
            name = "result_collections",
            joinColumns = @JoinColumn(name = "collection_id"),
            inverseJoinColumns = @JoinColumn(name = "result_id")
    )
    @ToString.Exclude
    private java.util.Collection<Result> resultCollection;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Collection that = (Collection) o;
        return getCollectionId() != null && Objects.equals(getCollectionId(), that.getCollectionId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(collectionId, collectionName);
    }
}
