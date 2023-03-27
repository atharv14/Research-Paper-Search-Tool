import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../api/utility";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthTabs = () => {
    const [loggingIn, setLogginIn] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (isUserLoggedIn()) navigate("/");
    }, []);

    const toggleTab = () => {
        setLogginIn(!loggingIn);
    };

    return (
        <Container className="auth-tabs">
            {loggingIn ? (
                <LoginForm toggleTab={toggleTab} />
            ) : (
                <RegisterForm toggleTab={toggleTab} />
            )}
        </Container>
    );
};

export default AuthTabs;
