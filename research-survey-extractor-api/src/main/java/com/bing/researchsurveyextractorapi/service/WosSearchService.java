package com.bing.researchsurveyextractorapi.service;

import com.bing.researchsurveyextractorapi.models.DatasourceApi;
import com.bing.researchsurveyextractorapi.models.Document;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class WosSearchService implements SearchService {

    @Value("${api.wos.key}")
    private String xApiKey;

    @Value("${api.wos.url}")
    private String apiWosUrl;

    @Value("${api.wos.databaseId}")
    private String dataBaseId;

    @Value("${api.wos.count}")
    private String count;

    @Value("${api.wos.firstRecord}")
    private String firstRecord;

    @Value("${api.wos.source.url}")
    private String url;
    @Override
    public String getServiceUrl() {
        return apiWosUrl;
    }

    @Override
    public DatasourceApi getServiceName() {
        return DatasourceApi.WOS;
    }

    @Override
    @PostConstruct
    public void registerService() {
        SearchServiceRegistry.getInstance().addSearchService(this);
    }

    @Override
    public List<Document> search(String queryText) {

        List<Document> documents = new ArrayList<>();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-ApiKey", xApiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        String wosQueryTextFormat = "TS=(%s)";
        String query = String.format(wosQueryTextFormat, queryText);

        URI apiUrl = UriComponentsBuilder.fromUri(URI.create(apiWosUrl))
                .queryParam("databaseId", dataBaseId)
                .queryParam("firstRecord", firstRecord)
                .queryParam("usrQuery", query)
                .queryParam("count", count)
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class).getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        Document.DocumentBuilder documentBuilder = Document.builder();

        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode dataNode = root.path("Data");
            for (JsonNode documentNode : dataNode) {
                //Title
                JsonNode titleNode = documentNode.get("Title").get("Title").get(0);
                if (titleNode != null){
                    documentBuilder.title(titleNode.asText());
                }
                //Article Date
                JsonNode sourceNode = documentNode.path("Source");
                JsonNode dateNode = sourceNode.path("Published.BiblioDate").get(0);
                JsonNode yearNode = sourceNode.path("Published.BiblioYear").get(0);
                if (dateNode != null && yearNode != null) {
                    String date = String.join(",", dateNode.asText(), yearNode.asText());
                    documentBuilder.articleDate(date);
                } else if (dateNode == null) {
                    documentBuilder.articleDate(yearNode.asText());
                }
                //Author Name
                JsonNode authorNameNode = documentNode.path("Author").path("Authors");
                if (authorNameNode != null && authorNameNode.isArray()){
                    List<String> authorNames = StreamSupport.stream(authorNameNode.spliterator(), false)
                            .map(JsonNode::asText)
                            .collect(Collectors.toList());
                    documentBuilder.authorNames(authorNames);
                }
                //Affiliation Country
                // Unable to retrieve it from the JSON response

                //Publication Name
                JsonNode publicationNameNode = documentNode.get("Source").get("SourceTitle").get(0);
                if (publicationNameNode != null){
                    documentBuilder.publicationName(publicationNameNode.asText());
                }
                //Issn
                JsonNode otherNode = documentNode.path("Other");
                String identifierEissn = "Identifier.Eissn";
                String identifierIssn = "Identifier.Issn";
                if (otherNode.has(identifierEissn)){
                    documentBuilder.issn(otherNode.get(identifierEissn).get(0).asText());
                } else if (otherNode.has(identifierIssn)) {
                    documentBuilder.issn(otherNode.get(identifierIssn).get(0).asText());
                }

                //Affiliation Name
                // Unable to retrieve it from the JSON response

                //URL
                JsonNode utNode = documentNode.get("UT");
                if (utNode != null && documentNode.has("UT")) {
                    String urlLink = url + utNode.asText();
                    documentBuilder.url(urlLink);
                }

                documents.add(documentBuilder.build());

            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        return documents;
    }
}
// TODO: 3/31/23 implement url and implement article date and year