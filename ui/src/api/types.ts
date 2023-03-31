export type projectType = {
    id: number;
    name: string;
    owner: string;
    collections: number[];
    queries: querySetType;
    desc: string;
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
