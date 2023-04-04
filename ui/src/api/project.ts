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
interface postProjectBody {
    name: string;
    description: string;
}
type returnSavedProject = (data: postProjectBody) => Promise<projectType>;
const postProject: returnSavedProject = async (data) => {
    const config = getConfig();
    const body = { projectName: data.name, description: data.description };

    console.log("Saving project", body);
    const url = API_URI + "/projects";

    const resp = await axios.post(url, body, config);
    console.log(resp.data);
    return resp.data;
};

export { getProjects, getProject, postProject };
