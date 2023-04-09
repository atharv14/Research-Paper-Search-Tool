export type projectType = {
    projectId: number;
    projectName: string;
    description: string;
    owner: string;
    collections: number[];
};

export type querySetType = {
    [qId: string]: queryType;
};

export type userType = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profilePicture: string;
    bio: string;
};

export type datasourceType = "IEEE" | "WOS" | "PUBMED";

export type resultCollectionType = {
    [source: string]: resultType[];
};

export type queryType = {
    queryId: number;
    // name: string;
    searchText: string;
    format?: string;
    searchResults: resultCollectionType;
};

export type resultDocumentType = {
    affiliationCountry: string;
    affiliationName: string;
    articleDate: string;
    authorName: string;
    issn: string;
    publicationName: string;
    title: string;
};

export type resultType = {
    datasource: datasourceType;
    priority: number;
    resultId?: number;
    document: resultDocumentType;
};

export type uniqueResultType = resultType & {
    source: string;
};

export type categorySetType = {
    [cId: string]: categoryType;
};

export type categoryType = {
    color: string;
    label: string;
    priority: number;
};
