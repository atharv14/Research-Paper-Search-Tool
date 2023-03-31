import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/user";

interface loginFormPropsType {
    toggleTab: () => void;
}

const LoginForm = ({ toggleTab }: loginFormPropsType) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        loginUser({ username: username, password: pass })
            .then((res) => navigate("/"))
            .catch((e) => alert(e));
    };

    return (
        <>
            <h2>Login</h2>
            <Form className="login-form">
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="John Doe"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="********"
                        id="password"
                    />
                </Form.Group>
                <Button type="submit" onClick={handleSubmit}>
                    Log In
                </Button>
            </Form>
            <Button
                className="mt-3"
                variant="outline-secondary"
                onClick={toggleTab}
            >
                Don't have an account? Register here.
            </Button>
        </>
    );
};

export default LoginForm;
