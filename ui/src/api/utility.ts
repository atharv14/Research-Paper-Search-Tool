const getToken = () => {
    return localStorage.getItem("token") || false;
};

const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export { getToken, setToken };
