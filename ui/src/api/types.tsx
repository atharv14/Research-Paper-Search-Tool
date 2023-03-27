export type projectType = {
    id: number;
    name: string;
    owner: string;
    collections: number[];
    queries: queryType[];
    desc: string;
};

export type userType = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profilePicture: string;
    bio: string;
};

export type queryType = {
    id: number;
    name: string;
    text: string;
    source: "ieee" | "wos" | "pubmed";
    results: resultType[];
};

export type resultType = {
    id: number;
    title: string;
    // link: string;
    articleDate: string;
    issn: string;
};
