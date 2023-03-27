const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
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

const getConfig = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export { getToken, setToken, isUserLoggedIn, unsetToken, getConfig };
