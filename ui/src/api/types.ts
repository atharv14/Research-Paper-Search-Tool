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

export type datasourceType = "ieee" | "wos" | "pubmed";

export type resultCollectionType = { [source: string]: resultType[] };

export type queryType = {
    name: string;
    text: string;
    format: string;
    results: resultCollectionType;
};

export type resultType = {
    affiliationCountry: string;
    affiliationName: string;
    articleDate: string;
    authorName: string;
    issn: string;
    publicationName: string;
    title: string;
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
