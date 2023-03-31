import { getProject } from "./project";
import { querySetType } from "./types";

type returnQuery = () => querySetType;

const getQuery: returnQuery = () => {
    return {};
};

export { getQuery };
