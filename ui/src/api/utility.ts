import {
    categorySetType,
    categoryType,
    datasourceType,
    resultDocumentType,
    resultType,
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

export const filterResultsByTitle = (arr: resultType[]) => {
    let f: string[] = [];
    return arr.filter((n) => {
        return f.indexOf(n.document.title) === -1 && f.push(n.document.title);
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
            resultId: 0,
        };
    });
    return processedData;
};

type returnColor = (cats: categorySetType, p: number) => string;
export const getCategoryColor: returnColor = (cats, p) => {
    const cat = Object.values(cats).find(({ priority }) => priority === p);
    return cat?.color || "#00000";
};

type returnLabel = (cats: categorySetType, p: number) => string;
export const getCategoryLabel: returnLabel = (cats, p) => {
    const cat = Object.values(cats).find(({ priority }) => priority === p);
    return cat?.label || "";
};

export const mergeResults = (res: resultType[][]) => {
    let mergedResults: resultType[] = [];
    Object.values(res).forEach((iRes) => {
        // individual res for sources
        mergedResults = mergedResults.concat(iRes);
    });
    const uniqueRes = filterResultsByTitle(mergedResults);
    return uniqueRes;
};
