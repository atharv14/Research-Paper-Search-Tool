package com.bing.researchsurveyextractorapi.pojo.searchresult;

import com.bing.researchsurveyextractorapi.models.DatasourceApi;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SearchResultDto {
    private long resultId;
    private String data;
    private int priority;
    private DatasourceApi datasource;
}