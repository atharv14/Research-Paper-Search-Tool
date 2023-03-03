import { userData } from "./dummyData";
import { userType } from "./types";

type returnUser = () => userType;

const getUser: returnUser = () => {
    return userData;
};

export { getUser };
