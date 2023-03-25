package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.Document;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScopusSearchService implements SearchService {

    @Value("${api.scopus.key}")
    private String apiKey;
    @Value("${api.scopus.url}")
    private String apiScopusUrl;

    @Override
    public String getServiceUrl() {
        return apiScopusUrl;
    }

    @Override
    public String getServiceName() {
        return "scopus";
    }

    @Override
    @PostConstruct
    public void registerService() {
        SearchServiceRegistry.getInstance().addSearchService(this);
    }

    @Override
    public List<Document> search(String queryText) {
        List<Document> documents = new ArrayList<>();
        URI apiUrl = UriComponentsBuilder.fromUri(URI.create(apiScopusUrl))
                .queryParam("query", queryText)
                .queryParam("apikey", apiKey)
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        String jsonResponse = restTemplate.getForObject(apiUrl, String.class);

        ObjectMapper objectMapper = new ObjectMapper();

        String title = "Not Found";
        String articleDate = "Not Found";
        String authorName = "Not Found";
        String affiliationCountry = "Not Found";
        String publicationName = "Not Found";
        String issn;
        String affiliationName = "Not Found";

        try{
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            JsonNode articlesNode = rootNode.get("search-results");
            JsonNode entries = articlesNode.get("entry");

            for(JsonNode entry : entries){
                //Title
                if (entry.get("dc:title").asText() != null){
                    title = entry.get("dc:title").asText();
                }

                //Article Date
                if (entry.get("prism:coverDate").asText() != null){
                    articleDate = entry.get("prism:coverDate").asText();
                }

                //authorName
                if (entry.get("dc:creator").asText() != null){
                    authorName = entry.get("dc:creator").asText();
                }

                //affiliationCountry
                JsonNode affiliationNode = entry.path("affiliation");
                for(JsonNode country : affiliationNode){
                    if (country.path("affiliation-country").asText() != null){
                        affiliationCountry = country.path("affiliation-country").asText();
                    }
                }

                //publicationName
                if (entry.get("prism:publicationName").asText() != null){
                    publicationName = entry.get("prism:publicationName").asText();
                }

                //issn
                if (entry.get("prism:eIssn").asText() != null){
                    issn = entry.get("prism:eIssn").asText();
                }else {
                    issn = "Not Found";
                }

                //affiliationName
                for(JsonNode name : affiliationNode){
                    if (name.path("affilname").asText() != null){
                        affiliationName = name.path("affilname").asText();
                    }
                }

                Document document = new Document(title, articleDate, authorName, affiliationCountry, publicationName, issn, affiliationName);
                documents.add(document);
            }

        }catch (Exception e) {
            e.printStackTrace();
        }
        return documents;
    }
}
