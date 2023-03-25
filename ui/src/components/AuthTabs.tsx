import { useState } from "react";
import { Container } from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthTabs = () => {
    const [loggingIn, setLogginIn] = useState(true);

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
