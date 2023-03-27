import { userData } from "./dummyData";
import { userType } from "./types";
import axios from "axios";
import { API_URI } from "./constants";
import { getToken, setToken } from "./utility";

const config = {
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
};

type returnUser = () => userType;
const getUser: returnUser = () => {
    return userData;
};

type registerUserBody = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
};

const registerUser = async (data: registerUserBody) => {
    console.log("registering User", data);
    const url = API_URI + "/auth/signup";
    const resp = await axios.post(url, data);
    console.log(resp);
    const { authToken } = resp.data;
    setToken(authToken);
    return true;
};

type loginUserBody = {
    username: string;
    password: string;
};

const loginUser = async (data: loginUserBody) => {
    console.log("Login in User", data);
    const url = API_URI + "/auth/signin";
    const resp = await axios.post(url, data);
    console.log(resp);
    const { authToken } = resp.data;
    setToken(authToken);
    return true;
};

export { getUser, registerUser, loginUser };
