import {
    categorySetType,
    categoryType,
    datasourceType,
    queryType,
    resultDocumentType,
    resultType,
    uniqueResultType,
} from "./types";

export const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

export const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const unsetToken = () => {
    localStorage.removeItem("token");
};

export const isUserLoggedIn = () => {
    return getToken();
};

export const getConfig = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const processQueryText = (q: string) => {
    return q.replaceAll("keyword = ", "");
};

export const filterResultsByTitle = (arr: uniqueResultType[]) => {
    let f: string[] = [];
    return arr.filter((n) => {
        return f.indexOf(n.document.title) == -1 && f.push(n.document.title);
    });
};

type returnDatasource = () => datasourceType[];
export const getDataSources: returnDatasource = () => {
    return ["IEEE", "WOS", "PUBMED"];
};

type returnCategorySet = (cats: categoryType[]) => categorySetType;
export const createCategorySet: returnCategorySet = (cats) => {
    let catSet = {};
    cats.forEach((cat) => {
        catSet[cat.categoryId.toString()] = { ...cat };
    });

    return catSet;
};

type returnProcessedSearchResponse = (
    data: resultDocumentType[],
    source: datasourceType,
    categories: categorySetType
) => resultType[];
export const processSearchResponse: returnProcessedSearchResponse = (
    data,
    source,
    categories
) => {
    const defaultCat = Object.values(categories)[0];
    const processedData: resultType[] = data.map((doc) => {
        return {
            datasource: source,
            priority: defaultCat.priority,
            document: doc,
        };
    });
    return processedData;
};
