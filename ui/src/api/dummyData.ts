import { projectType, queryType, resultType } from "./types";

export const userData = {
    firstName: "John",
    lastName: "Doe",
    username: "John_Doe",
    email: "johndoe@gmail.com",
    profilePicture: "https://via.placeholder.com/250x400.png",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat",
};

export const dummyDoc: resultType = {
    datasource: "IEEE",
    document: {
        title: "",
        affiliationCountry: [],
        affiliationNames: [],
        articleDate: "",
        authorNames: [],
        issn: "",
        publicationName: "",
    },
    priority: 0,
    resultId: 0,
};

export const dummyQuery: queryType = {
    queryId: 0,
    searchText: "",
    searchResults: {},
};
