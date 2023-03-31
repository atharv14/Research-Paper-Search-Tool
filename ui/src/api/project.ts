import { projects } from "./dummyData";
import { projectType } from "./types";

type returnProject = (projectId: number) => projectType | undefined;
const getProject: returnProject = (projectId: number) => {
    const projects = getProjects();
    let project;
    projects.forEach((proj) => {
        if (proj.id === projectId) project = proj;
    });
    return project;
};

type returnProjects = () => projectType[];

const getProjects: returnProjects = () => {
    return projects;
};

export { getProject, getProjects };
