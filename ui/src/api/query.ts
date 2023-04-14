import axios from "axios";
import { API_URI } from "./constants";
import { querySetType, queryType } from "./types";
import { getConfig } from "./utility";

type returnQueries = (pId: number) => Promise<querySetType>;

const getQueries: returnQueries = async (pId) => {
    const config = getConfig();

    console.log("Fetching Queries for project", pId);
    const url = API_URI + "/queries/project/" + pId;

    const resp = await axios.get(url, config);
    console.log(resp.data);
    return resp.data;
};

type returnQuery = (pId: number) => Promise<queryType>;

const getQuery: returnQuery = async (id) => {
    const config = getConfig();

    console.log("Fetching Query", id);
    const url = API_URI + "/queries/" + id;

    const resp = await axios.get(url, config);
    console.log(resp.data);
    return resp.data;
};
type returnSavedQuery = (pId: number, data: queryType) => Promise<queryType>;
const postQuery: returnSavedQuery = async (pId, data) => {
    const config = getConfig();
    const body = {
        projectId: pId,
        ...data,
    };
    console.log("Saving queries", body);
    const url = API_URI + "/queries";

    const resp = await axios.post(url, body, config);
    console.log(resp.data);
    return resp.data;
};

type returnUpdatedQuery = (
    id: number,
    resultId: number,
    priority: number
) => Promise<queryType>;
const updateQuery: returnUpdatedQuery = async (id, resultId, priority) => {
    const config = getConfig();
    const body = [{ resultId, priority }];
    console.log("Updating query", body);

    const url = API_URI + "/queries/results/" + id;
    const resp = await axios.patch(url, body, config);
    console.log(resp.data);
    return resp.data;
};

export { getQueries, postQuery, getQuery, updateQuery };
