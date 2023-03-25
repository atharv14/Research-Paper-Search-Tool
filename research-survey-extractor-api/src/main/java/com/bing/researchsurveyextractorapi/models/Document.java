package com.bing.researchsurveyextractorapi.models;

import java.io.Serializable;

public class Document implements Serializable {

    private static final long serialVersionUID = -3760445487636086034L;
    private String title;
    private String articleDate;
    private String authorName;
    private String affiliationCountry;
    private String publicationName;
    private String issn;
    private String affiliationName;
//    private String abstractPaper;

    public Document() {

    }



    public Document(String title,
                    String articleDate,
                    String authorName,
                    String affiliationCountry, //depends
                    String publicationName,
                    String issn,
                    String affiliationName) {

        this.title = title;
        this.articleDate = articleDate;
        this.authorName = authorName;
        this.affiliationCountry = affiliationCountry;
        this.publicationName = publicationName;
        this.issn = issn;
        this.affiliationName = affiliationName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArticleDate() {
        return articleDate;
    }

    public void setArticleDate(String articleDate) {
        this.articleDate = articleDate;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getAffiliationCountry() {
        return affiliationCountry;
    }

    public void setAffiliationCountry(String affiliationCountry) {
        this.affiliationCountry = affiliationCountry;
    }

    public String getPublicationName() {
        return publicationName;
    }

    public void setPublicationName(String publicationName) {
        this.publicationName = publicationName;
    }

    public String getIssn() {
        return issn;
    }

    public void setIssn(String issn) {
        this.issn = issn;
    }

    public String getAffiliationName() {
        return affiliationName;
    }

    public void setAffiliationName(String affiliationName) {
        this.affiliationName = affiliationName;
    }
}
