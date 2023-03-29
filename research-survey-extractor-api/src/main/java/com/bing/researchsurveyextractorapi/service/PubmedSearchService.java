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
import java.util.ArrayList;
import java.util.List;

@Service
public class PubmedSearchService implements SearchService{

    @Value("${api.pubmed.search.url}")
    private String apiSearchUrl;

    @Value("${api.pubmed.search.db}")
    private String db;

    @Value("${api.pubmed.search.sort}")
    private String sort;

    @Value("${api.pubmed.search.rettype}")
    private String rettype;

    @Value("${api.pubmed.search.retmode}")
    private String retmode;

    @Value("${api.pubmed.search.retmax}")
    private String retmax;

    @Value("${api.pubmed.fetch.url}")
    private String apiFetchUrl;

    @Override
    public String getServiceUrl() {
        return apiSearchUrl;
    }

    @Override
    public String getServiceName() {
        return DatasourceApi.PUBMED.getName();
    }

    @Override
    @PostConstruct
    public void registerService() {
        SearchServiceRegistry.getInstance().addSearchService(this);
    }

    @Override
    public List<Document> search(String queryText) {

        URI searchUrl = UriComponentsBuilder.fromUri(URI.create(apiSearchUrl))
                .queryParam("term", queryText)
                .queryParam("db", db)
                .queryParam("sort", sort)
                .queryParam("rettype", rettype)
                .queryParam("retmode", retmode)
                .queryParam("retmax", retmax)
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        String searchResponse = restTemplate.getForObject(searchUrl, String.class);
        ObjectMapper objectMapper = new ObjectMapper();

        List<String> ids = new ArrayList<>();
        try {
            JsonNode rootNode = objectMapper.readTree(searchResponse);
            JsonNode idListNode = rootNode.path("esearchresult").path("idlist");
            for (JsonNode idNode : idListNode) {
                ids.add(idNode.asText());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        URI fetchUrl = UriComponentsBuilder.fromUri(URI.create(apiFetchUrl))
                .queryParam("query", queryText)
                .queryParam("db", db)
                .queryParam("id", ids)
                .queryParam("rettype", rettype)
                .queryParam("retmode", retmode)
                .build()
                .toUri();

        String fetchResponse = restTemplate.getForObject(fetchUrl, String.class);
        ObjectMapper objectMapper1 = new ObjectMapper();

        String title;
        String articleDate;
        String authorName;
        String affiliationCountry = "Not Found";
        String publicationName;
        String issn;
        String affiliationName = "Not Found";

        List<Document> documents = new ArrayList<>();

        try {

            JsonNode rootNode = objectMapper1.readTree(fetchResponse);
            JsonNode resultNode = rootNode.path("result");

            for (int i=0; i<ids.size(); i++) {
                String id = ids.get(i);
                JsonNode idNode = resultNode.get(id);
                //Title
                if (idNode.get("title").asText() != null){
                    title = idNode.get("title").asText();
                } else {
                    title = "Not Found";
                }
                //Article Date
                if (idNode.get("epubdate").asText() != null){
                    articleDate = idNode.get("epubdate").asText();
                } else {
                    articleDate = "Not Found";
                }
                //Authors
                authorName = idNode.get("authors").asText();
                for (JsonNode authors : idNode.get("authors")){
                    authorName += authors.path("name").asText() + " | ";
                }
                //Affiliation Country
                //Unavailable in api response
                //Publication Name
                if (idNode.get("sorttitle").asText() != null){
                    publicationName = idNode.get("sorttitle").asText();
                } else {
                    publicationName = "Not Found";
                }
                //ISSN
                if (idNode.get("issn").asText() != null){
                    issn = idNode.get("issn").asText();
                } else {
                    issn = "Not Found";
                }
                //Affiliation Name
                //Unavailable in api response

                Document document = new Document(title, articleDate, authorName, affiliationCountry, publicationName, issn, affiliationName);
                documents.add(document);

            }
        }catch (Exception e) {
            e.printStackTrace();
        }

        return documents;

    }

}
