import axios from "axios";
import { API_URI } from "./constants";
import { categorySetType } from "./types";
import { getConfig } from "./utility";

type returnProject = (pId: number) => Promise<categorySetType>;
const getCategories: returnProject = async (pId) => {
    const config = getConfig();

    console.log("Fetching Categories for project", pId);
    const url = API_URI + "/categories/project/" + pId;

    const resp = await axios.get(url, config);
    console.log(resp.data);
    return resp.data;
};
type returnSavedCategory = (
    pId: number,
    categories: categorySetType
) => Promise<categorySetType>;

const postCategories: returnSavedCategory = async (pId, categories) => {
    const config = getConfig();
    const body = Object.values(categories);

    console.log("Saving project", body);
    const url = API_URI + "/categories/project/" + pId;

    const resp = await axios.post(url, body, config);
    console.log(resp.data);
    return resp.data;
};

export { postCategories, getCategories };
