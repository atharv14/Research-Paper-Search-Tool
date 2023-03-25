import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface loginFormPropsType {
    toggleTab: () => void;
}

const LoginForm = ({ toggleTab }: loginFormPropsType) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(email, pass);
    };

    return (
        <>
            <h2>Login</h2>
            <Form className="login-form">
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="youremail@gmail.com"
                        id="email"
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
