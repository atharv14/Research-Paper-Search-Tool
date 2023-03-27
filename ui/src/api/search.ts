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

const search = (data: searchBody) => {
    const url =
        API_URI + "/search/" + data.datasource + "?queryText=" + data.queryText;

    axios
        .get(url, config)
        .then((resp) => {
            console.log(resp.data);
            return resp.data;
        })
        .catch((e) => {
            console.log(e);
        });
};

export { search };
