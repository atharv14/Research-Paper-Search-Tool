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

const saveQueries = async (pId: number, data: queryType) => {
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

export { getQueries, saveQueries, getQuery };
