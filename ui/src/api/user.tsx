import { userData } from "./dummyData";
import { userType } from "./types";
import axios from "axios";
import { API_URI } from "./constants";
import { getToken } from "./utility";

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

const registerUser = (data: registerUserBody) => {
    const url = API_URI + "/auth/signup";

    axios
        .post(url, data, config)
        .then((resp) => {
            console.log(resp.data);
            alert("success");
            return true;
        })
        .catch((e) => {
            alert("failed");
            console.log(e);
        });
};

// const login = (data: loginUserBody) => {
//     const url = API_URI + "/auth/signup";

//     axios
//         .post(url, data, config)
//         .then((resp) => {
//             console.log(resp.data);
//             return true;
//         })
//         .catch((e) => {
//             console.log(e);
//         });
// };

export { getUser, registerUser };
