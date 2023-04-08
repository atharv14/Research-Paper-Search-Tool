import { datasourceType, uniqueResultType } from "./types";

const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

const unsetToken = () => {
    localStorage.removeItem("token");
};

const isUserLoggedIn = () => {
    return getToken();
};

const getConfig = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

const processQueryText = (q: string) => {
    return q.replaceAll("keyword = ", "");
};

const filterResultsByTitle = (arr: uniqueResultType[]) => {
    let f: string[] = [];
    return arr.filter((n) => {
        return f.indexOf(n.document.title) == -1 && f.push(n.document.title);
    });
};

type returnDatasource = () => datasourceType[];
const getDataSources: returnDatasource = () => {
    return ["ieee", "wos", "pubmed"];
};

export {
    getToken,
    setToken,
    isUserLoggedIn,
    unsetToken,
    getConfig,
    getDataSources,
    processQueryText,
    filterResultsByTitle,
};
