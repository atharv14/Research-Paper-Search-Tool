package com.bing.researchsurveyextractorapi.pojo.searchresult;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SearchResultDto {
    private long resultId;
    private String data;
    private long category;
}