const getToken = () => {
    return localStorage.getItem("token") || false;
};

const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

const unsetToken = () => {
    localStorage.removeItem("token");
};

const isUserLoggedIn = () => {
    return getToken();
};

export { getToken, setToken, isUserLoggedIn, unsetToken };
