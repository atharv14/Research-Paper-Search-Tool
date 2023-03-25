import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface registerFormPropsType {
    toggleTab: () => void;
}

const RegisterForm = ({ toggleTab }: registerFormPropsType) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(name, email, pass);
    };

    return (
        <>
            <h2>Register</h2>
            <Form className="register-form">
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        id="name"
                    />
                </Form.Group>
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
                    Register
                </Button>
            </Form>
            <Button
                className="mt-3"
                variant="outline-secondary"
                onClick={toggleTab}
            >
                Already have an account? Login here.
            </Button>
        </>
    );
};

export default RegisterForm;
