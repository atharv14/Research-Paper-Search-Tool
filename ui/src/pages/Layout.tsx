import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { isUserLoggedIn, unsetToken } from "../api/utility";
import MyNavbar from "../components/Navbar";

const Layout = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const logout = () => {
        unsetToken();
        setLoggedIn(false);
        navigate("/");
    };

    useEffect(() => {
        if (isUserLoggedIn()) setLoggedIn(true);
    }, []);
    return (
        <>
            <MyNavbar isLoggedIn={loggedIn} handleLogout={logout} />
            <Container style={{ padding: "4rem" }}>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;
