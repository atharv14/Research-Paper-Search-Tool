package com.bing.researchsurveyextractorapi.pojo.searchresult;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SearchResultRequest {
    private String data;
    private int category;
}
