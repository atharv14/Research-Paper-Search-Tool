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
    @Value("${api.pubmed.source.url}")
    private String url;

    @Override
    public String getServiceUrl() {
        return apiSearchUrl;
    }

    @Override
    public DatasourceApi getServiceName() {
        return DatasourceApi.PUBMED;
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
            for (JsonNode idNode : idListNode) ids.add(idNode.asText());
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

        Document.DocumentBuilder documentBuilder = Document.builder();

        List<Document> documents = new ArrayList<>();

        try {

            JsonNode rootNode = objectMapper1.readTree(fetchResponse);
            JsonNode resultNode = rootNode.path("result");

            for (String id : ids) {
                JsonNode idNode = resultNode.get(id);
                //Title
                extractTitle(documentBuilder, idNode);
                //Article Date
                extractArticleDate(documentBuilder, idNode);
                //Authors
                extractAuthorName(documentBuilder, idNode);
                //Affiliation Country
                //Unavailable in api response
                //Publication Name
                extractPublicationName(documentBuilder, idNode);
                //ISSN
                extractIssn(documentBuilder, idNode);
                //Affiliation Name
                //Unavailable in api response
                //URL
                extractUrl(documentBuilder, idNode);

                documents.add(documentBuilder.build());
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        return documents;
    }

    private void extractUrl(Document.DocumentBuilder documentBuilder, JsonNode idNode) {
        JsonNode uidNode = idNode.get("uid");
        if (uidNode != null && idNode.has("uid")) {
            String urlLink = url + uidNode.asText();
            documentBuilder.url(urlLink);
        }
    }

    private static void extractIssn(Document.DocumentBuilder documentBuilder, JsonNode idNode) {
        JsonNode issnNode = idNode.get("issn");
        if (issnNode != null) {
            documentBuilder.issn(issnNode.asText());
        }
    }

    private static void extractPublicationName(Document.DocumentBuilder documentBuilder, JsonNode idNode) {
        JsonNode publicationNameNode = idNode.get("sorttitle");
        if (publicationNameNode != null) {
            documentBuilder.publicationName(publicationNameNode.asText());
        }
    }

    private static void extractAuthorName(Document.DocumentBuilder documentBuilder, JsonNode idNode) {
        JsonNode authorsNode = idNode.path("authors");
        if (authorsNode.isArray()) {
            List<String> authorNames = new ArrayList<>();
            for (JsonNode authorNode : authorsNode) {
                JsonNode nameNode = authorNode.path("name");
                if (nameNode != null) {
                    String authorName = nameNode.asText();
                    authorNames.add(authorName);
                }
            }
            documentBuilder.authorNames(authorNames);
        }
    }

    private static void extractArticleDate(Document.DocumentBuilder documentBuilder, JsonNode idNode) {
        JsonNode articleDateNode = idNode.get("epubdate");
        JsonNode pubdateNode = idNode.get("pubdate");
        if (articleDateNode != null && !articleDateNode.isEmpty()) {
            documentBuilder.articleDate(articleDateNode.asText());
        } else if (pubdateNode != null) {
            documentBuilder.articleDate(pubdateNode.asText());
        }
    }

    private static void extractTitle(Document.DocumentBuilder documentBuilder, JsonNode idNode) {
        JsonNode titleNode = idNode.get("title");
        if (titleNode != null) {
            documentBuilder.title(titleNode.asText());
        }
    }
}
