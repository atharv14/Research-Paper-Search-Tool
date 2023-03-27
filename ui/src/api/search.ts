import axios from "axios";
import { API_URI } from "./constants";
import { getToken } from "./utility";

type searchBody = {
    datasource: string;
    queryText: string;
};

const config = {
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
};

const search = async (data: searchBody) => {
    console.log("Searching", data);
    const url =
        API_URI + "/search/" + data.datasource + "?queryText=" + data.queryText;

    const resp = await axios.get(url, config);
    console.log(resp.data);
    return resp.data.slice(0, 10);
};

export { search };
