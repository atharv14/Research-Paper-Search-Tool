import axios from "axios";
import { API_URI } from "./constants";
import { datasourceType } from "./types";
import { getConfig, processSearchResponse } from "./utility";

type searchBody = {
    datasource: string;
    queryText: string;
};

const search = async (data: searchBody) => {
    const config = getConfig();

    console.log("Searching", data);
    const url =
        API_URI +
        "/search/" +
        data.datasource.toUpperCase() +
        "?queryText=" +
        data.queryText;

    const resp = await axios.get(url, config);
    console.log(resp.data);
    const processedData = processSearchResponse(
        resp.data,
        data.datasource as datasourceType
    );
    return processedData.slice(0, 10);
};

export { search };
