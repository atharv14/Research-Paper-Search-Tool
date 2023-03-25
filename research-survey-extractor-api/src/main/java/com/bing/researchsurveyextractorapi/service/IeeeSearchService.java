package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.Document;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
public class IeeeSearchService implements SearchService{

    @Value("${api.ieee.key}")
    private String apiKey;

    @Value("${api.ieee.url}")
    private String apiIeeeUrl;

    @Value("${api.ieee.maxRecords}")
    private String maxRecords;

    @Override
    public String getServiceUrl() {
        return apiIeeeUrl;
    }

    @Override
    public String getServiceName() {
        return "ieee";
    }

    @Override
    @PostConstruct
    public void registerService() {
        SearchServiceRegistry.getInstance().addSearchService(this);
    }

    @SneakyThrows
    @Override
    public List<Document> search(String queryText) {
        List<Document> documents = new ArrayList<>();
        URI apiUrl = UriComponentsBuilder.fromUri(URI.create(apiIeeeUrl))
                .queryParam("query", queryText)
                .queryParam("apikey", apiKey)
                .queryParam("max_records", maxRecords)
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        String jsonResponse = restTemplate.getForObject(apiUrl, String.class);
        ObjectMapper objectMapper = new ObjectMapper();

        String title = "Not Found";
        String articleDate = "Not Found";
        String authorName = " ";
        String affiliationCountry = "Not Found";
        String publicationName = "Not Found";
        String issn = "Not Found";
        String affiliationName = " ";

        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            JsonNode articlesNode = rootNode.path("articles");
            for (JsonNode articleNode : articlesNode) {
                //Title
                if (articleNode.get("title").asText() != null){
                    title = articleNode.get("title").asText();
                }
                //Article Date
                if (articleDate != null){
                    articleDate = articleNode.get("publication_date").asText();
                }
                //Author Name
                JsonNode authorsNode = articleNode.path("authors").path("authors");
                if (authorsNode != null) {
                    for (JsonNode authorNode : authorsNode) {
                        authorName += authorNode.path("full_name").asText() + " | ";
                    }
                }else {
                    authorName = "Not Found";
                }
                //Affilliation Country
                authorsNode = articleNode.path("authors").path("authors");
                if (authorsNode != null) {
                    for (JsonNode authorNode : authorsNode) {
                        String affiliation = authorNode.path("affiliation").asText();
                        if (affiliation.contains(",")) {
                            String[] affiliationSplit = affiliation.split(",");
                            affiliationCountry = affiliationSplit[affiliationSplit.length - 1];
                        }
                    }
                }
                //Publication Name
                if (articleNode.get("publication_title").asText() != null){
                    publicationName = articleNode.get("publication_title").asText();
                }
                //issn
                if (articleNode.get("issn").asText() != null){
                    issn = articleNode.get("issn").asText();
                }
                //Affiliation Name
                if (authorsNode != null) {
                    for (JsonNode authorNode : authorsNode) {
                        affiliationName += authorNode.path("affiliation").asText() + " | ";
                    }
                }else {
                    affiliationName = "Not Found";
                }

                Document document = new Document(title, articleDate, authorName, affiliationCountry, publicationName, issn, affiliationName);
                documents.add(document);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return documents;
    }
}
