import { datasourceType } from "./types";

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
};
