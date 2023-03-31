import { Container } from "react-bootstrap";
import AuthTabs from "../components/AuthTabs";

const Auth = () => {
    return (
        <Container className="auth-page">
            <AuthTabs />
        </Container>
    );
};

export default Auth;
