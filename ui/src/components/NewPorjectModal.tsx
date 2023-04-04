import React, { useState } from "react";
import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
    Modal,
    Row,
} from "react-bootstrap";
import { projectType } from "../api/types";

interface newProjectModalProps {
    show: boolean;
    saveProject: (name: string, description: string) => void;
    handleClose: () => void;
}

const NewPorjectModal = ({
    show,
    saveProject,
    handleClose,
}: newProjectModalProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const clearInputs = () => {
        setName("");
        setDescription("");
    };

    const handleSave = () => {
        saveProject(name, description);
        clearInputs();
        handleClose();
    };
    return (
        <Modal size="lg" show={show} centered>
            <Modal.Header closeButton>
                <Modal.Title>Project Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="1">
                            Name
                        </Form.Label>
                        <Col sm="11">
                            <Form.Control
                                type="text"
                                placeholder="Brand New Project"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Description"
                    >
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ height: "100px" }}
                        />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewPorjectModal;
