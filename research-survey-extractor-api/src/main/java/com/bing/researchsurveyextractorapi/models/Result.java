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
public class Result {

    @Id
    @GeneratedValue
    private Long resultId;

    @Column(columnDefinition = "jsonb", nullable = false)
    private String data;

    @OneToOne
    private Category category;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Result result = (Result) o;
        return getResultId() != null && Objects.equals(getResultId(), result.getResultId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(resultId);
    }
}
