package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.DatasourceApi;
import com.bing.researchsurveyextractorapi.models.Document;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import java.net.URI;
import java.util.*;

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
    public DatasourceApi getServiceName() {
        return DatasourceApi.SCOPUS;
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

        Document.DocumentBuilder documentBuilder = Document.builder();

        try{
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            JsonNode articlesNode = rootNode.get("search-results");
            JsonNode entries = articlesNode.get("entry");

            for(JsonNode entry : entries){
                //Title
                extractTitle(documentBuilder, entry);

                //Article Date
                extractArticleDate(documentBuilder, entry);

                //authorName
                extractAuthorName(documentBuilder, entry);

                //affiliationCountry
                JsonNode affiliationNode = extractAffiliationCountry(documentBuilder, entry);

                //publicationName
                extractPublicationName(documentBuilder, entry);

                //issn
                extractIssn(documentBuilder, entry);

                //affiliationName
                extractAffiliationName(documentBuilder, affiliationNode);

                //url
                extractUrl(documentBuilder, entry);

                documents.add(documentBuilder.build());
            }

        }catch (Exception e) {
            e.printStackTrace();
        }
        return documents;
    }

    private static void extractUrl(Document.DocumentBuilder documentBuilder, JsonNode entry) {
        JsonNode prismUrl = entry.get("prism:url");
        if (entry.has("prism:url") && prismUrl != null) {
            documentBuilder.url(prismUrl.asText());
        }
    }

    private static void extractAffiliationName(Document.DocumentBuilder documentBuilder, JsonNode affiliationNode) {
        if (affiliationNode.isArray()) {
            Set<String> affiliationNames = new HashSet<>();
            for (JsonNode affiliation : affiliationNode) {
                JsonNode affNameNode = affiliation.path("affilname");
                if (affNameNode != null && !affNameNode.asText().isEmpty()) {
                    affiliationNames.add(affNameNode.asText());
                }
            }
            documentBuilder.affiliationNames(new ArrayList<>(affiliationNames));
        }
    }

    private static void extractIssn(Document.DocumentBuilder documentBuilder, JsonNode entry) {
        String prismeIssn = "prism:eIssn";
        String prismIssn = "prism:issn";
        if (entry.has(prismeIssn) && entry.get(prismeIssn).isTextual()){
            documentBuilder.issn(entry.get(prismeIssn).asText());
        } else if (entry.has(prismIssn) && entry.get(prismIssn).isTextual()) {
            documentBuilder.issn(entry.get(prismIssn).asText());
        }
    }

    private static void extractPublicationName(Document.DocumentBuilder documentBuilder, JsonNode entry) {
        JsonNode pubNameNode = entry.get("prism:publicationName");
        if (pubNameNode != null){
            documentBuilder.publicationName(pubNameNode.asText());
        }
    }

    private static JsonNode extractAffiliationCountry(Document.DocumentBuilder documentBuilder, JsonNode entry) {
        JsonNode affiliationNode = entry.path("affiliation");
        if (affiliationNode.isArray()) {
            Set<String> affiliationCountries = new HashSet<>();
            for (JsonNode affiliation : affiliationNode) {
                JsonNode countryNode = affiliation.path("affiliation-country");
                if (countryNode != null && !countryNode.asText().isEmpty()) {
                    affiliationCountries.add(countryNode.asText());
                }
            }
            documentBuilder.affiliationCountry(affiliationCountries);
        }
        return affiliationNode;
    }

    private static void extractAuthorName(Document.DocumentBuilder documentBuilder, JsonNode entry) {
        JsonNode authorNameNode = entry.get("dc:creator");
        if (authorNameNode != null){
            List<String> authorNames = Collections.singletonList(authorNameNode.asText());
            documentBuilder.authorNames(authorNames);
        }
    }

    private static void extractArticleDate(Document.DocumentBuilder documentBuilder, JsonNode entry) {
        JsonNode articleDateNode = entry.get("prism:coverDate");
        if (articleDateNode != null){
            documentBuilder.articleDate(articleDateNode.asText());
        }
    }

    private static void extractTitle(Document.DocumentBuilder documentBuilder, JsonNode entry) {
        JsonNode titleNode = entry.get("dc:title");
        if (titleNode != null)
            documentBuilder.title(titleNode.asText());
    }
}
