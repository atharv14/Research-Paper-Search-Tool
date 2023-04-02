import axios from "axios";
import { API_URI } from "./constants";
import { projectType } from "./types";
import { getConfig } from "./utility";

type returnProject = (id: number) => Promise<projectType>;
const getProject: returnProject = async (id) => {
    const config = getConfig();

    console.log("Fetching Project", id);
    const url = API_URI + "/projects/" + id;

    const resp = await axios.get(url, config);
    console.log(resp.data);
    return resp.data;
};
type returnProjects = () => Promise<projectType[]>;
const getProjects: returnProjects = async () => {
    const config = getConfig();

    console.log("Fetching Projects");
    const url = API_URI + "/projects";

    const resp = await axios.get(url, config);
    console.log(resp.data);
    return resp.data;
};

export { getProjects, getProject };
