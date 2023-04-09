import {
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
type returnProcessedSearchResponse = (
    data: resultDocumentType[],
    source: datasourceType
) => resultType[];
export const processSearchResponse: returnProcessedSearchResponse = (
    data,
    source
) => {
    const processedData: resultType[] = data.map((doc) => {
        return {
            datasource: source,
            priority: 0,
            document: doc,
        };
    });
    return processedData;
};
