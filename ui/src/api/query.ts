import axios from "axios";
import { API_URI } from "./constants";
import { querySetType, queryType } from "./types";
import { getConfig } from "./utility";

type returnQueries = (pId: number) => Promise<querySetType>;

const getQueries: returnQueries = async (id) => {
    const config = getConfig();

    console.log("Fetching Queries for project", id);
    const url = API_URI + "/queries/project/" + id;

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

export { getQueries, saveQueries };
