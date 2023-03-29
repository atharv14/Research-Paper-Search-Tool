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
import java.util.logging.Logger;

@Service
public class WosSearchService implements SearchService {

    private static final Logger LOGGER = Logger.getLogger(
            Thread.currentThread().getStackTrace()[0].getClassName() );

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

    @Override
    public String getServiceUrl() {
        return apiWosUrl;
    }

    @Override
    public String getServiceName() {
        return DatasourceApi.WOS.getName();
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

        String title = "Not Found";
        String articleDate;
        String authorName;
        String affiliationCountry = "Not Found";
        String publicationName = "Not Found";
        String issn = "Not Found";
        String affiliationName = "Not Found";

        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode dataNode = root.path("Data");
            for (JsonNode documentNode : dataNode) {
                //Title
                if (documentNode.get("Title").get("Title").get(0) != null){
                    LOGGER.info("Logging an title message");
                    LOGGER.info(title);
                    title = documentNode.get("Title").get("Title").get(0).asText();
                    LOGGER.info(title);
                }
                //Article Date
                JsonNode sourceNode = documentNode.get("Source");
                if (sourceNode != null){
                    if (sourceNode.get("Published.BiblioDate") != null && sourceNode.get("Published.BiblioYear") != null) {
                        articleDate = sourceNode.get("Published.BiblioDate").get(0).asText() + "," +
                                sourceNode.get("Published.BiblioYear").get(0).asText();
                    } else {
                        articleDate = "Not Found";
                    }
                } else {
                    articleDate = "Not Found";
                }
                //Author Name
                if (documentNode.get("Author").get("Authors").get(0) != null){
                    authorName = documentNode.get("Author").get("Authors").get(0).asText();
                }else {
                    authorName = "Not Found";
                }
                //Affiliation Country
                // Unable to retrieve it from the JSON response
                //Publication Name
                if (documentNode.get("Source").get("SourceTitle").get(0) != null){
                    publicationName = documentNode.get("Source").get("SourceTitle").get(0).asText();
                }
                //ISSN
                if (documentNode.path("Other").path("Identifier.Eissn").get(0) != null){
                    issn = documentNode.path("Other").path("Identifier.Eissn").get(0).asText();
                }
                //Affiliation Name
                // Unable to retrieve it from the JSON response

                Document document = new Document(title, articleDate, authorName, affiliationCountry, publicationName, issn, affiliationName);
                documents.add(document);
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        return documents;
    }
}
